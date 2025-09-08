import Image from 'next/image';

const ChildOldCare = () => {
  return (
    <div className="w-full bg-white py-16">
      <div className=" mx-auto px-4">
       
        <div className="relative mb-8">
          <div className="relative w-full flex justify-center items-center">
            {/* Images Container with curved borders */}
            <div className="relative w-full  h-120 overflow-hidden">
              {/* Curved top border */}
              <div className="absolute top-0 left-0 w-full h-4 bg-white rounded-t-full transform -translate-y-2 z-10"></div>
              
              {/* Images Container */}
              <div className="relative flex gap-2 justify-center items-center w-full h-full bg-gray-100 overflow-hidden">
                {/* Left Image - Grayscale */}
                <div className="relative w-1/3 h-full overflow-hidden">
                  <Image
                    src="/assets/childoldcare/4people.png"
                    alt="Adult woman with three children"
                    fill
                    className="object-cover grayscale"
                  />
                </div>
                
                {/* Middle Image - Grayscale */}
                <div className="relative w-1/3 h-full overflow-hidden">
                  <Image
                    src="/assets/childoldcare/child.png"
                    alt="Children in difficult circumstances"
                    fill
                    className="object-cover grayscale"
                  />
                </div>
                
                {/* Right Image - Sepia */}
                <div className="relative w-1/3 h-full overflow-hidden">
                  <Image
                    src="/assets/childoldcare/brownchild.png"
                    alt="Joyful running child"
                    fill
                    className="object-cover sepia"
                  />
                </div>
              </div>
              
              {/* Curved bottom border */}
              <div className="absolute bottom-0 left-0 w-full h-4 bg-white rounded-b-full transform translate-y-2 z-10"></div>
            </div>
          </div>
        </div>
        
        {/* Text Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2" style={{fontFamily: 'var(--font-nunito), Nunito, sans-serif', fontWeight: '800'}}>
            Old People & Child Trouble
          </h2>
          <p className="text-lg text-gray-500">
            child & oldcare
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChildOldCare;
