"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Building, Clock, MapPin } from "lucide-react";
import { Fragment } from "react";

export default function JobMatchingPage() {
  const [showJobModal, setShowJobModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [nextPageToken, setNextPageToken] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();
  const searchLocationTimeoutRef = useRef();
  const filterLocationTimeoutRef = useRef();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filterLocationInput, setFilterLocationInput] = useState("");
  const [filterCitySuggestions, setFilterCitySuggestions] = useState([]);
  const [filterLocationLoading, setFilterLocationLoading] = useState(false);
  const [searchLocationInput, setSearchLocationInput] = useState("");
  const [searchCitySuggestions, setSearchCitySuggestions] = useState([]);
  const [searchLocationLoading, setSearchLocationLoading] = useState(false);
  const [positionInput, setPositionInput] = useState("");
  const [jobs, setJobs] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("Any");
  const [selectedDate, setSelectedDate] = useState("All time");
  const [selectedExperience, setSelectedExperience] =
    useState("Any experience");
  const [selectedEmployment, setSelectedEmployment] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeMobileFilter, setActiveMobileFilter] = useState(null);
  const [canFilterNow, setCanFilterNow] = useState(false);

  useEffect(() => {
    async function fetchInitialJobs() {
      setInitialLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs`
        );
        const data = await response.json();
        if (Array.isArray(data.jobs) && data.jobs.length > 0) {
          setJobs(data.jobs);
        } else {
          setJobs([]);
        }
        setNextPageToken(data.nextPageToken || null);
      } catch (err) {
        setJobs([]);
      } finally {
        setCanFilterNow(true);
      }
      setInitialLoading(false);
    }
    fetchInitialJobs();
  }, []);

  useEffect(() => {
    if (canFilterNow) {
      handleSearch();
    }
  }, [selectedSalary, selectedDate, selectedExperience, selectedEmployment]);

  const handlePositionInputChange = (e) => {
    setPositionInput(e.target.value);
  };

  // Helper to map frontend filters to backend params
  const getFilterParams = (nextPageToken = null) => {
    const params = [];
    params.push(`query=${encodeURIComponent(positionInput)}`);
    params.push(`location=${encodeURIComponent(searchLocationInput)}`);
    if (nextPageToken)
      params.push(`nextPageToken=${encodeURIComponent(nextPageToken)}`);

    const locationMap = {
      "Within 15 km": "15km",
      "Within 30 km": "30km",
      "Within 50 km": "50km",
    };
    if (locationMap[selectedLocation]) {
      params.push(`radiusKm=${locationMap[selectedLocation]}`);
    }

    const dateMap = {
      "Last 24 hours": "Last 24 hours",
      "Last 7 days": "Last 7 days",
      "Last 30 days": "Last 30 days",
    };
    if (dateMap[selectedDate]) {
      params.push(`datePosted=${encodeURIComponent(selectedDate)}`);
    }

    if (selectedEmployment.length > 0) {
      params.push(
        `employmentType=${encodeURIComponent(selectedEmployment[0])}`
      );
    }

    if (selectedSalary && selectedSalary !== "Any") {
      params.push(`salaryRange=${encodeURIComponent(selectedSalary)}`);
    }

    const expMap = {
      "Any experience": "",
      Internship: "Entry",
      "Work remotely": "Mid",
    };
    if (expMap[selectedExperience]) {
      params.push(
        `experienceLevel=${encodeURIComponent(expMap[selectedExperience])}`
      );
    }
    return params.join("&");
  };

  const handleSearch = async () => {
    if (!positionInput.trim()) {
      setSearchError("Please enter position.");
      return;
    }
    if (!searchLocationInput.trim()) {
      setSearchError("Please enter location.");
      return;
    }
    setSearchError("");
    setSearchLoading(true);
    setNextPageToken(null);
    // Reset all sidebar filters
    setFilterLocationInput("");
    try {
      const queryString = getFilterParams();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs?${queryString}`
      );
      const data = await response.json();
      if (Array.isArray(data.jobs) && data.jobs.length > 0) {
        setJobs(data.jobs);
      } else {
        setJobs([]);
        setSearchError("No jobs found.");
      }
      setNextPageToken(data.nextPageToken || null);
    } catch (err) {
      setSearchError("Failed to fetch jobs.");
      setJobs([]);
      setNextPageToken(null);
    }
    setSearchLoading(false);
  };

  const handleNextPage = async () => {
    if (!nextPageToken) return;
    setSearchLoading(true);
    try {
      const queryString = getFilterParams(nextPageToken);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs?${queryString}`
      );
      const data = await response.json();
      if (Array.isArray(data.jobs) && data.jobs.length > 0) {
        setJobs(data.jobs);
      } else {
        setJobs([]);
        setSearchError("No jobs found.");
      }
      setNextPageToken(data.nextPageToken || null);
    } catch (err) {
      setSearchError("Failed to fetch jobs.");
      setJobs([]);
      setNextPageToken(null);
    }
    setSearchLoading(false);
  };

  const handleLocationInputChange = (e) => {
    const value = e.target.value;
    setSearchLocationInput(value);
    setFilterLocationInput(value);
    setLocationError("");
    if (searchLocationTimeoutRef.current)
      clearTimeout(searchLocationTimeoutRef.current);
    if (value.length < 2) {
      setSearchCitySuggestions([]);
      return;
    }
    setSearchLocationLoading(true);
    searchLocationTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/api/jobs/places?input=${encodeURIComponent(value)}`
        );
        const data = await response.json();
        if (data.success && Array.isArray(data.cities)) {
          setSearchCitySuggestions(data.cities);
        } else {
          setSearchCitySuggestions([]);
        }
      } catch (err) {
        setSearchCitySuggestions([]);
      }
      setSearchLocationLoading(false);
    }, 300);
  };

  // For filter sidebar location input
  const handleFilterLocationInputChange = (e) => {
    const value = e.target.value;
    setFilterLocationInput(value);
    setSearchLocationInput(value);
    setSelectedLocation("");
    setLocationError("");
    if (filterLocationTimeoutRef.current)
      clearTimeout(filterLocationTimeoutRef.current);
    if (value.length < 2) {
      setFilterCitySuggestions([]);
      return;
    }
    setFilterLocationLoading(true);
    filterLocationTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/api/jobs/places?input=${encodeURIComponent(value)}`
        );
        const data = await response.json();
        if (data.success && Array.isArray(data.cities)) {
          setFilterCitySuggestions(data.cities);
        } else {
          setFilterCitySuggestions([]);
        }
      } catch (err) {
        setFilterCitySuggestions([]);
      }
      setFilterLocationLoading(false);
    }, 300);
  };

  const handleCitySelect = (cityName) => {
    setSearchLocationInput(cityName);
    setFilterLocationInput(cityName);
    setSearchCitySuggestions([]);
    setLocationError("");
  };

  // For filter sidebar city select
  const handleFilterCitySelect = (cityName) => {
    setSelectedLocation(cityName);
    setFilterLocationInput(cityName);
    setSearchLocationInput(cityName);
    setFilterCitySuggestions([]);
    setLocationError("");
  };

  const handleEmploymentChange = (type) => {
    if (selectedEmployment.includes(type)) {
      setSelectedEmployment(selectedEmployment.filter((t) => t !== type));
    } else {
      setSelectedEmployment([...selectedEmployment, type]);
    }
  };

  const handleMobileFilterClick = (filterType) => {
    setActiveMobileFilter(
      activeMobileFilter === filterType ? null : filterType
    );
    setShowMobileFilters(true);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-dm-sans">
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Find your <span className="text-[#345773]">new job</span> today
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Thousands of jobs in the computer, engineering and technology
            sectors are waiting for you.
          </p>

          <div className="max-w-3xl mx-auto">
            <div
              className={`flex flex-col sm:flex-row gap-4 bg-white border border-gray-300 rounded-lg p-2 ${
                searchError ? "border-red-400" : "border-gray-300"
              }`}
            >
              <div
                className={`flex sm:hidden items-center gap-3 px-4 py-3 bg-white border rounded-lg ${
                  searchError ? "border-red-400" : "border-gray-300"
                }`}
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="What position are you looking for?"
                  className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                  value={positionInput}
                  onChange={handlePositionInputChange}
                />
                <div className="flex items-center gap-2 cursor-pointer">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>

              <div
                className={`hidden sm:flex flex-1 items-center gap-3 px-4 py-3 ${
                  searchError ? "border-red-400" : "border-gray-300"
                }`}
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="What position are you looking for?"
                  className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                  value={positionInput}
                  onChange={handlePositionInputChange}
                />
              </div>
              <div
                className={`hidden sm:flex items-center gap-3 px-4 py-2 border-l cursor-pointer ${
                  searchError ? "border-red-400" : "border-gray-300"
                }`}
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="relative w-full max-w-36">
                  <input
                    type="text"
                    placeholder="Enter Location"
                    className="w-full outline-none text-gray-700 placeholder-gray-400 px-2 py-1 rounded"
                    value={searchLocationInput}
                    onChange={handleLocationInputChange}
                    autoComplete="off"
                  />
                  {searchLocationLoading && (
                    <div className="absolute right-2 top-2 text-xs text-gray-400">
                      Loading...
                    </div>
                  )}
                  {searchCitySuggestions.length > 0 && (
                    <ul className="absolute left-0 right-0 top-full bg-white border border-[#e4e7ea] rounded-xl shadow-lg z-20 mt-2 max-h-60 overflow-y-auto custom-scrollbar me-auto max-w-[8rem]">
                      {searchCitySuggestions.map((city, idx) => (
                        <li
                          key={city.place_id}
                          className="flex items-center px-4 py-1 cursor-pointer transition-colors text-gray-800 hover:bg-[#f0f6fa] hover:text-[#345773] border-b last:border-b-0 border-gray-100 font-medium text-sm"
                          style={{
                            borderTopLeftRadius:
                              idx === 0 ? "0.75rem" : undefined,
                            borderTopRightRadius:
                              idx === 0 ? "0.75rem" : undefined,
                            borderBottomLeftRadius:
                              idx === searchCitySuggestions.length - 1
                                ? "0.75rem"
                                : undefined,
                            borderBottomRightRadius:
                              idx === searchCitySuggestions.length - 1
                                ? "0.75rem"
                                : undefined,
                          }}
                          onClick={() => handleCitySelect(city.city)}
                        >
                          <span className="truncate">{city.city}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <button
                className="bg-[#345773] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#2a4560] cursor-pointer transition-colors"
                onClick={handleSearch}
                disabled={searchLoading}
              >
                {searchLoading ? "Searching..." : "Search job"}
              </button>
            </div>
            {searchError && (
              <div className="text-red-500 text-xs mt-1">{searchError}</div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="hidden lg:block lg:col-span-3 order-2 lg:order-1">
            <div className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Filters</h2>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Location</h3>
                <div className="space-y-2">
                  <div className="relative mb-2">
                    <input
                      type="text"
                      placeholder="Enter city/location"
                      className="w-full outline-none text-gray-700 placeholder-gray-400 px-2 py-1 rounded border border-gray-300"
                      value={filterLocationInput}
                      onChange={handleFilterLocationInputChange}
                      autoComplete="off"
                    />
                    {filterLocationLoading && (
                      <div className="absolute right-2 top-2 text-xs text-gray-400">
                        Loading...
                      </div>
                    )}
                    {filterCitySuggestions.length > 0 && (
                      <ul className="absolute left-0 right-0 top-full bg-white border border-[#e4e7ea] rounded-xl shadow-lg z-20 mt-2 max-h-60 overflow-y-auto custom-scrollbar me-auto max-w-[12rem]">
                        {filterCitySuggestions.map((city, idx) => (
                          <li
                            key={city.place_id}
                            className="flex items-center px-4 py-1 cursor-pointer transition-colors text-gray-800 hover:bg-[#f0f6fa] hover:text-[#345773] border-b last:border-b-0 border-gray-100 font-medium text-sm"
                            style={{
                              borderTopLeftRadius:
                                idx === 0 ? "0.75rem" : undefined,
                              borderTopRightRadius:
                                idx === 0 ? "0.75rem" : undefined,
                              borderBottomLeftRadius:
                                idx === filterCitySuggestions.length - 1
                                  ? "0.75rem"
                                  : undefined,
                              borderBottomRightRadius:
                                idx === filterCitySuggestions.length - 1
                                  ? "0.75rem"
                                  : undefined,
                            }}
                            onClick={() => handleFilterCitySelect(city.city)}
                          >
                            <span className="truncate">{city.city}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {[
                    "Near me",
                    "Within 15 km",
                    "Within 30 km",
                    "Within 50 km",
                  ].map((location) => (
                    <label
                      key={location}
                      className={`flex items-center gap-2 cursor-pointer ${
                        locationError ? "border border-red-400 rounded" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="location"
                        value={location}
                        checked={selectedLocation === location}
                        onChange={(e) => {
                          // Prevent selection if no location is set
                          if (
                            !filterLocationInput.trim() &&
                            !searchLocationInput.trim()
                          ) {
                            setLocationError("Type location first");
                            return;
                          }
                          setSelectedLocation(e.target.value);
                          setLocationError("");
                        }}
                        className="w-4 h-4 text-[#345773] border-gray-300 focus:ring-[#345773] accent-[#345773]"
                        disabled={
                          !filterLocationInput.trim() &&
                          !searchLocationInput.trim()
                        }
                      />
                      <span className="text-gray-700 text-sm lg:text-base">
                        {location}
                      </span>
                    </label>
                  ))}
                  {locationError && (
                    <div className="text-red-500 text-xs mt-1">
                      {locationError}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Salary</h3>
                <div className="space-y-2">
                  {["Any", ">30000k", ">50000k", ">80000k", ">100000k"].map(
                    (salary) => (
                      <label
                        key={salary}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="salary"
                          value={salary}
                          checked={selectedSalary === salary}
                          onChange={(e) => setSelectedSalary(e.target.value)}
                          className="w-4 h-4 text-[#345773] border-gray-300 focus:ring-[#345773] accent-[#345773]"
                        />
                        <span className="text-gray-700 text-sm lg:text-base">
                          {salary}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="mb-6 text-gray-700">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Date of posting
                </h3>
                <div className="space-y-2">
                  {[
                    "All time",
                    "Last 24 hours",
                    "Last 3 days",
                    "Last 7 days",
                  ].map((date) => (
                    <label
                      key={date}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="date"
                        value={date}
                        checked={selectedDate === date}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-4 h-4 text-[#345773] border-gray-300 focus:ring-[#345773] accent-[#345773]"
                      />
                      <span className="text-gray-700 text-sm lg:text-base">
                        {date}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Work experience
                </h3>
                <div className="space-y-2">
                  {["Any experience", "Internship", "Work remotely"].map(
                    (experience) => (
                      <label
                        key={experience}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="experience"
                          value={experience}
                          checked={selectedExperience === experience}
                          onChange={(e) =>
                            setSelectedExperience(e.target.value)
                          }
                          className="w-4 h-4 text-[#345773] border-gray-300 focus:ring-[#345773] accent-[#345773]"
                        />
                        <span className="text-gray-700 text-sm lg:text-base">
                          {experience}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Type of employment
                </h3>
                <div className="space-y-2">
                  {["Full-time", "Temporary", "Part-time"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedEmployment.includes(type)}
                        onChange={() => handleEmploymentChange(type)}
                        className="w-4 h-4 text-[#345773] border-gray-300 rounded focus:ring-[#345773] accent-[#345773]"
                      />
                      <span className="text-gray-700 text-sm lg:text-base">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="lg:hidden">
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="flex items-center gap-2 cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-600 text-sm">Filter by</span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      showMobileFilters ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {showMobileFilters && (
              <div className="lg:hidden bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <div className="space-y-2">
                  <div>
                    <button
                      onClick={() => handleMobileFilterClick("location")}
                      className={`w-full flex items-center text-gray-700 justify-between p-3 rounded-lg border transition-colors ${
                        activeMobileFilter === "location"
                          ? "border-[#345773] bg-[#345773] text-white"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <span className="font-medium">Location</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          activeMobileFilter === "location" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {activeMobileFilter === "location" && (
                      <div className="mt-2 p-3 text-gray-700 bg-gray-50 rounded-lg">
                        {[
                          "Near me",
                          "Remote job",
                          "Exact location",
                          "Within 15 km",
                          "Within 30 km",
                          "Within 50 km",
                        ].map((location) => (
                          <label
                            key={location}
                            className="flex items-center gap-2 text-gray-700 cursor-pointer py-1"
                          >
                            <input
                              type="radio"
                              name="mobile-location"
                              value={location}
                              checked={selectedLocation === location}
                              onChange={(e) =>
                                setSelectedLocation(e.target.value)
                              }
                              className="w-4 h-4 text-[#345773] border-gray-300 focus:ring-[#345773] accent-[#345773]"
                            />
                            <span className="text-gray-700 text-sm">
                              {location}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() => handleMobileFilterClick("salary")}
                      className={`w-full flex items-center justify-between text-gray-700 p-3 rounded-lg border transition-colors ${
                        activeMobileFilter === "salary"
                          ? "border-[#345773] bg-[#345773] text-white"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <span className="font-medium">Salary</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          activeMobileFilter === "salary" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {activeMobileFilter === "salary" && (
                      <div className="mt-2 p-3 text-gray-700 bg-gray-50 rounded-lg">
                        <div className="space-y-1">
                          {[
                            "Any",
                            ">30000k",
                            ">50000k",
                            ">80000k",
                            ">100000k",
                          ].map((salary) => (
                            <label
                              key={salary}
                              className="flex items-center text-gray-700 gap-2 cursor-pointer py-1"
                            >
                              <input
                                type="radio"
                                name="mobile-salary"
                                value={salary}
                                checked={selectedSalary === salary}
                                onChange={(e) =>
                                  setSelectedSalary(e.target.value)
                                }
                                className="w-4 h-4 text-[#345773] border-gray-300 focus:ring-[#345773] accent-[#345773]"
                              />
                              <span className="text-gray-700 text-sm">
                                {salary}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() => handleMobileFilterClick("date")}
                      className={`w-full flex items-center justify-between text-gray-700 p-3 rounded-lg border transition-colors ${
                        activeMobileFilter === "date"
                          ? "border-[#345773] bg-[#345773] text-white"
                          : "border-gray-200 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span className="font-medium">Date of posting</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          activeMobileFilter === "date" ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {activeMobileFilter === "date" && (
                      <div className="mt-2 p-3 text-gray-700 bg-gray-50 rounded-lg">
                        {[
                          "All time",
                          "Last 24 hours",
                          "Last 3 days",
                          "Last 7 days",
                        ].map((date) => (
                          <label
                            key={date}
                            className="flex items-center text-gray-700 gap-2 cursor-pointer py-1"
                          >
                            <input
                              type="radio"
                              name="mobile-date"
                              value={date}
                              checked={selectedDate === date}
                              onChange={(e) => setSelectedDate(e.target.value)}
                              className="w-4 h-4 text-[#345773] border-gray-300 focus:ring-[#345773] accent-[#345773]"
                            />
                            <span className="text-gray-700 text-sm">
                              {date}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() => handleMobileFilterClick("experience")}
                      className={`w-full flex items-center justify-between text-gray-700 p-3 rounded-lg border transition-colors ${
                        activeMobileFilter === "experience"
                          ? "border-[#345773] bg-[#345773] text-white"
                          : "border-gray-200 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span className="font-medium">Work experience</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          activeMobileFilter === "experience"
                            ? "rotate-180"
                            : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {activeMobileFilter === "experience" && (
                      <div className="mt-2 p-3 text-gray-700 bg-gray-50 rounded-lg">
                        {["Any experience", "Internship", "Work remotely"].map(
                          (experience) => (
                            <label
                              key={experience}
                              className="flex items-center text-gray-700 gap-2 cursor-pointer py-1"
                            >
                              <input
                                type="radio"
                                name="mobile-experience"
                                value={experience}
                                checked={selectedExperience === experience}
                                onChange={(e) =>
                                  setSelectedExperience(e.target.value)
                                }
                                className="w-4 h-4 text-[#345773] border-gray-300 focus:ring-[#345773] accent-[#345773]"
                              />
                              <span className="text-gray-700 text-sm">
                                {experience}
                              </span>
                            </label>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() => handleMobileFilterClick("employment")}
                      className={`w-full flex items-center justify-between text-gray-700 p-3 rounded-lg border transition-colors ${
                        activeMobileFilter === "employment"
                          ? "border-[#345773] bg-[#345773] text-white"
                          : "border-gray-200 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <span className="font-medium">Type of employment</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          activeMobileFilter === "employment"
                            ? "rotate-180"
                            : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {activeMobileFilter === "employment" && (
                      <div className="mt-2 p-3 text-gray-700 bg-gray-50 rounded-lg">
                        {["Full-time", "Temporary", "Part-time"].map((type) => (
                          <label
                            key={type}
                            className="flex items-center text-gray-700 gap-2 cursor-pointer py-1"
                          >
                            <input
                              type="checkbox"
                              checked={selectedEmployment.includes(type)}
                              onChange={() => handleEmploymentChange(type)}
                              className="w-4 h-4 text-[#345773] border-gray-300 rounded focus:ring-[#345773] accent-[#345773]"
                            />
                            <span className="text-gray-700 text-sm">
                              {type}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {initialLoading ? (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Job Results
                  </h2>
                  {[...Array(6)].map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200 rounded-xl p-4 lg:p-6 flex items-start gap-4 animate-pulse"
                    >
                      <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-gray-200" />
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="h-5 bg-gray-200 rounded w-2/3" />
                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                        <div className="flex gap-2 mt-2">
                          <div className="h-4 bg-gray-200 rounded w-16" />
                          <div className="h-4 bg-gray-200 rounded w-12" />
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-full mt-2" />
                        <div className="h-4 bg-gray-200 rounded w-5/6" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : jobs.length > 0 ? (
                <div className="text-left">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Job Results
                  </h2>
                  <div className="space-y-6">
                    {jobs.map((job, idx) => (
                      <div
                        key={job.job_id || idx}
                        className="bg-white border border-gray-200 rounded-xl p-4 lg:p-6 hover:shadow-lg transition-all cursor-pointer flex items-start gap-4"
                        onClick={() => {
                          setSelectedJob(job);
                          setShowJobModal(true);
                        }}
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 flex-shrink-0 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                          {job.thumbnail ? (
                            <img
                              src={job.thumbnail}
                              alt={job.company_name || "Company"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Building className="w-8 h-8 text-gray-400" />
                          )}
                        </div>

                        {/* Job Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 truncate max-w-sm">
                                {job.title}
                              </h3>
                              <div className="text-gray-600 text-sm">
                                {job.company_name}
                              </div>
                            </div>
                            {job.detected_extensions?.posted_at && (
                              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                                {job.detected_extensions.posted_at}
                              </span>
                            )}
                          </div>

                          {/* Meta info */}
                          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-3 mt-3">
                            {job.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="truncate">{job.location}</span>
                              </div>
                            )}
                            {job.detected_extensions?.schedule_type && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span>
                                  {job.detected_extensions.schedule_type}
                                </span>
                              </div>
                            )}
                            {job.extensions &&
                              job.extensions.map((ext, i) => (
                                <span
                                  key={i}
                                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs truncate"
                                >
                                  {ext}
                                </span>
                              ))}
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {job.description}
                          </p>

                          {/* Apply buttons */}
                          {/* {job.apply_options?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {job.apply_options.slice(0, 3).map((opt, i) => (
                  <a
                    key={i}
                    href={opt.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#345773] text-white px-3 py-1 rounded text-xs font-medium hover:bg-[#2a4560] transition-colors truncate"
                  >
                    {opt.title}
                  </a>
                ))}
                {job.apply_options.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{job.apply_options.length - 3} more
                  </span>
                )}
              </div>
            )} */}
                        </div>
                      </div>
                    ))}
                  </div>
                  {nextPageToken && (
                    <div className="flex justify-center mt-8">
                      <button
                        className="bg-[#345773] text-white px-20 py-3 rounded-lg font-medium hover:bg-[#2a4560] transition-colors shadow"
                        onClick={handleNextPage}
                        disabled={searchLoading}
                      >
                        {searchLoading ? "Loading..." : "Next"}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Empty State
                <div className="mt-12 flex flex-col items-center justify-center text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    We couldn't find any jobs matching your search. Try
                    adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-3 order-3">
            <div className="space-y-4 lg:space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="font-semibold text-gray-800 text-sm lg:text-base">
                    Email me for jobs
                  </h3>
                </div>
                <p className="text-gray-600 text-xs lg:text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore.
                </p>
                <input
                  type="email"
                  placeholder="name@mail.com"
                  className="w-full px-3 lg:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#345773] focus:border-transparent text-sm lg:text-base"
                />
                <button className="w-full mt-3 bg-[#345773] text-white py-2 rounded-lg font-medium hover:bg-[#2a4560] transition-colors cursor-pointer text-sm lg:text-base">
                  Subscribe
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <h3 className="font-semibold text-gray-800 text-sm lg:text-base">
                    Get noticed faster
                  </h3>
                </div>
                <p className="text-gray-600 text-xs lg:text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore.
                </p>
                <button className="w-full bg-[#345773] text-white py-2 rounded-lg font-medium hover:bg-[#2a4560] transition-colors cursor-pointer text-sm lg:text-base">
                  Upload your resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Job Details Modal */}
      {showJobModal && selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 backdrop-blur-sm"
          onClick={(e) => {
            // Only close if clicking the backdrop, not the modal content
            if (e.target === e.currentTarget) setShowJobModal(false);
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-0 relative border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                {selectedJob.thumbnail ? (
                  <img
                    src={selectedJob.thumbnail}
                    alt={selectedJob.company_name || "Company"}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                  />
                ) : (
                  <Building className="w-10 h-10 text-gray-300" />
                )}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {selectedJob.title}
                  </h2>
                  <div className="text-gray-600 text-base font-medium">
                    {selectedJob.company_name}
                  </div>
                </div>
              </div>
              <button
                className="text-gray-400 hover:text-gray-700 text-2xl font-bold transition-colors"
                onClick={() => setShowJobModal(false)}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="px-6 pt-4 pb-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {selectedJob.location && (
                  <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded text-gray-700 text-xs">
                    <MapPin className="w-4 h-4" />
                    {selectedJob.location}
                  </span>
                )}
                {selectedJob.detected_extensions?.posted_at && (
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                    {selectedJob.detected_extensions.posted_at}
                  </span>
                )}
                {selectedJob.detected_extensions?.schedule_type && (
                  <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded text-gray-700 text-xs">
                    <Clock className="w-4 h-4" />
                    {selectedJob.detected_extensions.schedule_type}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  Job Description
                </h3>
                <div className="max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                  <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
                    {selectedJob.description}
                  </p>
                </div>
              </div>
              {selectedJob.apply_options?.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800 mb-2 text-base">
                    Apply Options
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(showJobModal && selectedJob.showAllApplyOptions
                      ? selectedJob.apply_options
                      : selectedJob.apply_options.slice(0, 4)
                    ).map((opt, i) => (
                      <a
                        key={i}
                        href={opt.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#345773] text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-[#2a4560] transition-colors shadow-sm"
                      >
                        {opt.title}
                      </a>
                    ))}
                    {selectedJob.apply_options.length > 4 &&
                      !selectedJob.showAllApplyOptions && (
                        <button
                          className="text-xs text-[#345773] font-semibold px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                          onClick={() => {
                            setSelectedJob({
                              ...selectedJob,
                              showAllApplyOptions: true,
                            });
                          }}
                        >
                          +{selectedJob.apply_options.length - 4} more
                        </button>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
