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
  ];

  useEffect(() => {
    const handleScroll = () => {
      setMapScrolled(
        Math.min(
          1,
          2 *
            (window.scrollY / (document.body.scrollHeight - window.innerHeight))
        )
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const translateXPercentage = Math.max(0, 50 - mapScrolled * 50);

  return (
    <div className="relative min-h-[200vh] w-screen bg-[#00165e]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_300px,#304da3,transparent)]"></div>
      <p>{mapScrolled} mapScrolled</p>
      <div className="absolute h-full z-10 w-full top-[200px] flex justify-center items-flex">
        <h1 className="gradient-animation z-10 font-bold text-5xl tracking-tight bg-gradient-to-r from-[#25be74] via-[#11aa60] to-[rgb(18,207,185)] text-transparent bg-clip-text bg-[180%_auto]">
          Lankytinos vietos Lietuvoje
        </h1>
      </div>

      <div className="mt-96 sticky top-0 flex justify-center h-screen w-screen items-center z-10">
        <div className="w-[1500px] h-[800px]">
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
      </div>

      <div className="relative z-20 h-full w-full bottom-0">
        <div
          className="w-5/12 h-fit z-20 -rotate-12 relative bottom-0"
          style={{
            transform: `translateX(${translateXPercentage}%)`,
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
      </div>

      {/* Additional scrollable content */}
      <div className="h-[100vh] w-full"></div>
    </div>
  );
}
