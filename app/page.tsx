"use client";
import MapObject from "@/components/mapObject";
import { LietuvaMap } from "@/components/map";
import { ScrollControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const CameraOrbitController = ({ mapScrolled }: { mapScrolled: number }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 20 - 20 * mapScrolled;
    camera.zoom = 1 + mapScrolled;

    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, mapScrolled]);

  return null;
};

export default function Home() {
  const [mapScrolled, setMapScrolled] = useState(0);
  const [locationIndex, setLocationIndex] = useState(0);

  const locations = [
    {
      title: "Kabantis lynų tiltas Anykščių šilelyje",
      image: "",
      desc: "Šiemet Anykščių šilelyje išdygo ant plieninių lynų pakibęs pėsčiųjų ir dviračių tiltas per Šventąją. Pastarasis rado vietą netoli Medžių Lajų tako ir Puntuko akmens ir dabar jungia kairiojo kranto dviračių taką su greitai atsidarysiančiu dešiniojo kranto dviračių taku. Šis beždžionių tiltas nepaliko abejingų ne tik socialiniuose tinkluose, bet ir pačiame šilelyje.",
    },
    {},
    {},
    {},
    {},
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollMax = document.body.scrollHeight - window.innerHeight;
      setMapScrolled(Math.min(1, 3 * (window.scrollY / scrollMax)));

      if (window.scrollY > scrollMax * (1 / 3)) {
        const vienosVietosIlgis = (scrollMax * (2 / 3)) / locations.length;

        const newIndex = Math.min(
          locations.length - 1,
          Math.floor((window.scrollY - scrollMax * (1 / 3)) / vienosVietosIlgis) // Corrected parentheses
        );

        setLocationIndex(newIndex);
      } else {
        setLocationIndex(0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const XPercent = Math.max(0, 50 - mapScrolled * 50);

  return (
    <div className="relative h-[5000px] w-screen bg-[#fff]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_300px,#304da3,transparent)]"></div>
      <p className="sticky top-0">
        {mapScrolled} mapScrolled {locationIndex}
      </p>
      <div className="absolute h-full z-10 w-full top-[200px] flex justify-center items-flex">
        <h1 className="gradient-animation z-10 font-bold text-5xl tracking-tight bg-gradient-to-r from-[#25be74] via-[#11aa60] to-[rgb(18,207,185)] text-transparent bg-clip-text bg-[180%_auto]">
          Lankytinos vietos Lietuvoje
        </h1>
      </div>

      <div className="mt-96 sticky top-0 flex justify-center h-screen w-screen items-center z-10">
        <div className="w-[1500px] h-[800px] relative z-10">
          <Canvas
            camera={{
              position: [0, 23, 20],
              fov: 70,
              zoom: 1.3,
              aspect: 2,
            }}
            className="canvas-block"
          >
            <Suspense fallback={null}>
              <MapObject>
                <ambientLight intensity={3} />
                <ScrollControls pages={3}>
                  <LietuvaMap />
                </ScrollControls>
              </MapObject>
              <CameraOrbitController mapScrolled={mapScrolled} />
            </Suspense>
          </Canvas>
        </div>
        <div
          className="w-5/12 h-fit z-0 -rotate-12 absolute left-0"
          style={{
            transform: `translateX(${XPercent + 10}%)`,
          }}
        >
          <Image
            src="/gradients/gradient1.png"
            alt="gradient"
            width={740}
            height={818}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="w-5/12 h-fit z-0 -rotate-12 absolute left-0"
          style={{
            transform: `translateX(${XPercent + 20}%)`,
          }}
        >
          <Image
            src="/gradients/gradient1.png"
            alt="gradient"
            width={740}
            height={818}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="w-5/12 h-fit z-0 -rotate-12 absolute left-0"
          style={{
            transform: `translateX(${140 - XPercent}%)`,
          }}
        >
          <Image
            src="/gradients/gradient4.png"
            alt="gradient"
            width={740}
            height={818}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="w-5/12 h-fit z-0 -rotate-12 absolute left-0"
          style={{
            transform: `translateX(${120 - XPercent}%)`,
          }}
        >
          <Image
            src="/gradients/gradient2.png"
            alt="gradient"
            width={740}
            height={818}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="w-5/12 h-fit z-0 -rotate-12 absolute left-0"
          style={{
            transform: `translateX(${40 + XPercent}%)`,
          }}
        >
          <Image
            src="/gradients/gradient3.png"
            alt="gradient"
            width={740}
            height={818}
            className="w-full h-full object-cover"
          />
        </div>
        {locationIndex == 1 && (
          <div className="absolute w-96 h-96 top-1/4 left-1/2 z-10 bg-[#000] opacity-50">
            <Image
              src={"/pointer-pin.svg"}
              width={24}
              height={24}
              alt="Pointer pin"
            />
          </div>
        )}
      </div>
    </div>
  );
}
