
import React from "react";
import styles from "./Contact.module.css";
import Image from "next/image";
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaUser,
    FaShareAlt,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { FaHandHoldingHeart } from "react-icons/fa";

const Contact = () => {
    return (
        <div className={styles["contact-page"]}>
            <div className={styles["contact-container"]}>
                {/* Left Section */}
                <div className={styles["contact-info"]}>

                    <p className={styles.subtitle}><FaHandHoldingHeart className="text-[#00715D]" size={20}/>Get In Touch</p>
                    <h1 className={styles.title}>Contact Us</h1>
                    <p className={styles.description}>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque laudantium, totam rem aperiam, eaque
                        inventore.
                    </p>

                    <div className={styles["info-grid"]}>
                        <div className={styles["info-block"]}>
                            <FaMapMarkerAlt className={styles.icon} />
                            <div>
                                <h4>Location</h4>
                                <p>
                                    55 main street, 2nd block,
                                    <br />
                                    Melbourne, Australia
                                </p>
                            </div>
                        </div>

                        <div className={styles["info-block"]}>
                            <FaPhoneAlt className={styles.icon} />
                            <div>
                                <h4>Phone</h4>
                                <p>
                                    +1 (368) 567 89 54
                                    <br />
                                    +236 (456) 896 22
                                </p>
                            </div>
                        </div>

                        <div className={styles["info-block"]}>
                            <FaEnvelope className={styles.icon} />
                            <div>
                                <h4>Email</h4>
                                <p>
                                    example@email.com
                                    <br />
                                    charifund@email.com
                                </p>
                            </div>
                        </div>

                        <div className={styles["info-block"]}>

                            <FaShareAlt className={styles.icon} />
                            <div>
                                <h4>Social</h4>
                                <div className={styles["social-links"]}>
                                    <a href="#">
                                        <FaFacebookF />
                                    </a>
                                    <a href="#">
                                        <i className="fab fa-vimeo-v">V</i>
                                    </a>
                                    <a href="#">
                                        <FaTwitter />
                                    </a>
                                    <a href="#">
                                        <FaLinkedinIn />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className={styles["contact-image"]}>
                            <Image
                                src="/contact.png"
                                alt="Contact Illustration"
                                height={260}
                                width={516}
                                className={styles.img}
                            />
                        </div>
                    </div>
                </div>



                {/* Right Section - Form */}
                <div className={styles["contact-form"]}>
                    <h2>Fill Up The Form</h2>
                    <p className={styles["form-desc"]}>
                        Your email address will not be published. Required fields are marked
                        *
                    </p>
                    <form>
                        <div className={styles["form-group"]}>
                            <input type="text" placeholder="Enter Name" />
                            <FaUser className={styles["form-icon"]} />

                        </div>
                        <div className={styles["form-group"]}>
                            <input type="email" placeholder="Enter Email" />
                            <FiMail className={styles["form-icon"]} />

                        </div>
                        <div className={styles["form-group"]}>
                            <input type="text" placeholder="Phone Number" />
                            <FaPhoneAlt className={styles["form-icon"]} />

                        </div>
                        <div className={styles["form-group"]}>

                            <textarea placeholder="Your Message..."></textarea>
                            <FaEnvelope className={styles["form-icon"]} />
                        </div>
                        <button type="submit" className={styles.btn}>
                            Get A Quote
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
