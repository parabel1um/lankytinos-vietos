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
      title: "Parnidžio kopa, E. A. Jonušo g., Nida",
      image: "parnidzio-kopa.jpg",
      desc: "Tai – viena gausiai lankomų mūsų šalies vietų, kurias kasmet aplanko tūkstančiai turistų iš visos Lietuvos ir pasaulio. 52 m aukščio Parnidžio kopa yra puiki vieta, jei norite apžvelgti Nidos apylinkes. Šios kopos viršūnėje yra įrengta aikštelė, nuo kurios, atsiveria Nidos gyvenvietė panorama, o taip pat – Baltijos jūra. Esant puikiam orui, bus galima išvysti ir Ventės ragą.",
    },
    {
      title: "Medžių lajų takas, Dvaronių k. 5, Anykščiai",
      image: "lynu-tiltas.jpg",
      desc: "Šis takas yra ypatingas tuo, kad tai – pirmasis takas Baltijos valstybėse ir visoje Rytų Europoje, kuri galima leistis į neįtikėtinai malonius bei žaismingus pasivaikščiojimus medžių lajų lygyje. Kompleksą sudaro informacinis centras, Medžių lajų takas ir apžvalgos bokštas. Palei taką auga patys įvairiausi medžiai: paprastosios eglės, paprastieji ąžuolai, paprastieji klevai, karpotieji beržai ir t.t.",
    },
    {
      title: "Burbiškio dvaras, Parko gatvė 1B, Burbiškis",
      image: "dvaras.jpg",
      desc: "Įsikūręs Anykščių regioniniame parke, netoli Rubikių ežero. Dvaro ansamblis buvo restauruotas 1853 metais, atkurti autentiški lubų ir sienų tapybos darbai, originalios rudojo uosio durys, išlikę vertingi dekoruoti priesieniniai židiniai. Šiandien Burbiškio dvaras yra tikrų tikriausia poilsio oazė visai šeimai, teikiamos apgyvendinimo paslaugos, veikia restoranas, organizuojamos ekskursijos ir t.t.",
    },
    {
      title: "Kauno botanikos sodas, Ž. E. Žilibero g. 6, Kaunas",
      image: "botanikos-sodas.jpg",
      desc: "Jei norite pasidžiaugti tūkstančiais skirtingų augalų bei jų žiedų, išvysti rečiausių rūšių augalų, tai Kauno botanikos sodas yra viena iš tų vietų, kurią būtinai turite aplankyti. Prieš planuodami apsilankymą, nepamirškite, kad skirtingi augalai žydi skirtingu metu, todėl, pasidomėkite, ką bus galima pamatyti. Taip pat galima sudalyvauti ir įvairiose ekskursijose, pavyzdžiui, „Nuo Aukštosios Fredos dvaro iki šiuolaikiško botanikos sodo“, „Gėlynų spalvos, naujovės ir kasdieniai rūpesčiai“, „Atogrąžų ir paatogrąžių augalai oranžerijoje“ ir t.t. ",
    },
    {
      title: "Gedimino pilis, Arsenalo g. 5, Vilnius",
      image: "gedimino-pilis.jpg",
      desc: "Tikrai netrūksta priežasčių, kodėl turite aplankyti šį objektą, jei to, vis dar nepadarėte: tai yra viena iš Senamiesčio vietų, kuri vaizduojamas įvairiausiuose meno kūriniuose, o užlipus ant Gedimino kalno ar pakilus dar aukščiau – ant Gedimino bokšto apžvalgos aikštelės - atsiveria nuostabiausios Vilniaus panoramos, saulėlydžiai, raudoni Vilniaus stogai, bažnyčių bokštai, siauros gatvelės atrodo stulbinančiai. Na, o Gedmino bokšte galite pamatyti istorinę parodą, kurioje eksponuojami Vilniaus pilių rekonstrukcijos modeliai, ginkluotė ir senojo Vilniaus ikonografika.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollMax = document.body.scrollHeight - window.innerHeight;
      setMapScrolled(Math.min(1, 3 * (window.scrollY / scrollMax)));

      if (window.scrollY > scrollMax * (1 / 3)) {
        const vienosVietosIlgis =
          (scrollMax * (2 / 3)) / (locations.length + 1);

        const index = Math.min(
          locations.length,
          Math.floor((window.scrollY - scrollMax * (1 / 3)) / vienosVietosIlgis)
        );

        setLocationIndex(index);
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
    <div className="relative h-[5000px] w-screen z-0">
      <div className="absolute h-[1000px] w-full -top-[500px] z-0 circle-gradient"></div>
      <div className="absolute h-[5200px] w-full z-10 noise"></div>
      <div className="sticky top-0 w-2 h-2"></div>
      <div className="absolute h-full z-10 w-full top-[200px] flex justify-center items-flex">
        <h1 className="gradient-animation z-10 font-medium text-6xl tracking-tight bg-gradient-to-r from-[#25be74] via-[#11aa60] to-[rgb(18,207,185)] text-transparent bg-clip-text bg-[180%_auto]">
          Lankytinos vietos Lietuvoje
        </h1>
      </div>

      <div className="mt-96 sticky top-0 flex justify-center h-screen w-screen items-center z-10">
        <div className="w-[1800px] h-[950px] relative z-10">
          <Canvas
            camera={{
              position: [0, 23, 20],
              fov: 70,
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
          {locationIndex == 1 && (
            <div className="absolute inline-flex items-center gap-3 w-fit h-fit top-[28%] left-[19.7%] z-10">
              <div className="w-fit h-fit ">
                <Image
                  src={"/pointer-pin.svg"}
                  width={48}
                  height={48}
                  alt="Pointer"
                />
              </div>
              <div className="w-[600px] h-fit p-3 text-white gap-7 bg-black bg-opacity-60 top-0 left-0 flex justify-between items-center relative rounded-lg ring-[#3f3f3f] ring-4 ring-offset-4">
                <div className="flex flex-col gap-2 w-1/2">
                  <p>{locations[0].title}</p>
                  <p className="text-md text-medium">{locations[0].desc}</p>
                </div>

                <div className="w-1/2 h-full flex justify-center items-center">
                  <Image
                    src={`/locations/${locations[0].image}`}
                    alt={locations[0].title}
                    width={500}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          )}
          {locationIndex == 2 && (
            <div className="absolute inline-flex items-center gap-3 w-fit h-fit top-[10%] left-[62%] z-10">
              <div className="w-fit h-fit ">
                <Image
                  src={"/pointer-pin.svg"}
                  width={48}
                  height={48}
                  alt="Pointer"
                />
              </div>
              <div className="w-[600px] h-fit p-3 text-white gap-7 bg-black bg-opacity-60 top-0 left-0 flex justify-between items-center relative rounded-lg ring-[#3f3f3f] ring-4 ring-offset-4">
                <div className="flex flex-col gap-2 w-1/2">
                  <p>{locations[1].title}</p>
                  <p className="text-md text-medium">{locations[1].desc}</p>
                </div>

                <div className="w-1/2 h-full flex justify-center items-center">
                  <Image
                    src={`/locations/${locations[1].image}`}
                    alt={locations[1].title}
                    width={500}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          )}
          {locationIndex == 3 && (
            <div className="absolute inline-flex items-center gap-3 w-fit h-fit top-[12%] left-[63%] z-10">
              <div className="w-fit h-fit ">
                <Image
                  src={"/pointer-pin.svg"}
                  width={48}
                  height={48}
                  alt="Pointer"
                />
              </div>
              <div className="w-[600px] h-fit p-3 text-white gap-7 bg-black bg-opacity-60 top-0 left-0 flex justify-between items-center relative rounded-lg ring-[#3f3f3f] ring-4 ring-offset-4">
                <div className="flex flex-col gap-2 w-1/2">
                  <p>{locations[2].title}</p>
                  <p className="text-md text-medium">{locations[2].desc}</p>
                </div>

                <div className="w-1/2 h-full flex justify-center items-center">
                  <Image
                    src={`/locations/${locations[2].image}`}
                    alt={locations[2].title}
                    width={500}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          )}
          {locationIndex == 4 && (
            <div className="absolute inline-flex items-center gap-3 w-fit h-fit top-[36%] left-[50%] z-10">
              <div className="w-fit h-fit ">
                <Image
                  src={"/pointer-pin.svg"}
                  width={48}
                  height={48}
                  alt="Pointer"
                />
              </div>
              <div className="w-[600px] h-fit p-3 text-white gap-7 bg-black bg-opacity-60 top-0 left-0 flex justify-between items-center relative rounded-lg ring-[#3f3f3f] ring-4 ring-offset-4">
                <div className="flex flex-col gap-2 w-1/2">
                  <p>{locations[3].title}</p>
                  <p className="text-md text-medium">{locations[3].desc}</p>
                </div>

                <div className="w-1/2 h-full flex justify-center items-center">
                  <Image
                    src={`/locations/${locations[3].image}`}
                    alt={locations[3].title}
                    width={500}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          )}
          {locationIndex == 5 && (
            <div className="absolute inline-flex items-center gap-3 w-fit h-fit top-[37.5%] left-[65%] z-10">
              <div className="w-fit h-fit ">
                <Image
                  src={"/pointer-pin.svg"}
                  width={48}
                  height={48}
                  alt="Pointer"
                />
              </div>
              <div className="w-[600px] h-fit p-3 text-white gap-7 bg-black bg-opacity-60 top-0 left-0 flex justify-between items-center relative rounded-lg ring-[#3f3f3f] ring-4 ring-offset-4">
                <div className="flex flex-col gap-2 w-1/2">
                  <p>{locations[4].title}</p>
                  <p className="text-md text-medium">{locations[4].desc}</p>
                </div>

                <div className="w-1/2 h-full flex justify-center items-center">
                  <Image
                    src={`/locations/${locations[4].image}`}
                    alt={locations[4].title}
                    width={500}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          )}
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
      </div>
    </div>
  );
}
