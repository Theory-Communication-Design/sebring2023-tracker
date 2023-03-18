import { useState, useEffect } from "react";
import Image from "next/image";

import {
  sebringApp,
  sebringSite,
  corvette,
  porsche,
  lexus,
} from "@/firebase/db";
import { getDocs, onSnapshot } from "firebase/firestore";

import logo from "../../public/ue-logo.png";

export async function getServerSideProps() {
  const initialSiteData = await getData(sebringSite);
  const initialAppData = await getData(sebringApp);
  const initialCorvetteData = await getData(corvette);
  const initialPorscheData = await getData(porsche);
  const initialLexusData = await getData(lexus);

  async function getData(ref) {
    const snapshot = await getDocs(ref);
    const data = snapshot.docs.map((doc) => {
      return doc.data().email;
    });

    return data;
  }

  return {
    props: {
      initialSiteData,
      initialAppData,
      initialCorvetteData,
      initialLexusData,
      initialPorscheData,
    },
  };
}

export default function Home({
  initialAppData,
  initialSiteData,
  initialCorvetteData,
  initialPorscheData,
  initialLexusData,
}) {
  const [appData, setAppData] = useState(initialAppData);
  const [siteData, setSiteData] = useState(initialSiteData);
  const [corvetteData, setCorvetteData] = useState(initialCorvetteData);
  const [porscheData, setPorscheData] = useState(initialPorscheData);
  const [lexusData, setLexusData] = useState(initialLexusData);

  useEffect(() => {
    const siteUnsub = onSnapshot(sebringSite, (querySnapshot) => {
      setSiteData(querySnapshot.docs.map((doc) => doc.data().email));
    });
    const appUnsub = onSnapshot(sebringApp, (querySnapshot) => {
      setAppData(querySnapshot.docs.map((doc) => doc.data().email));
    });
    const corvetteUnsub = onSnapshot(corvette, (querySnapshot) => {
      setCorvetteData(querySnapshot.docs.map((doc) => doc.data().email));
    });
    const porscheUnsub = onSnapshot(porsche, (querySnapshot) => {
      setPorscheData(querySnapshot.docs.map((doc) => doc.data().email));
    });
    const lexusUnsub = onSnapshot(lexus, (querySnapshot) => {
      setLexusData(querySnapshot.docs.map((doc) => doc.data().email));
    });

    return () => {
      siteUnsub();
      appUnsub();
      corvetteUnsub();
      porscheUnsub();
      lexusUnsub();
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#0066b3] to-[#003c65] h-screen overflow-auto">
      <div className="w-2/12 mx-auto pt-6 pb-6">
        <Image src={logo} alt="Unrivaled Experiences" />
      </div>
      <div className="flex justify-center mt-24 mb-8">
        <div className="bg-slate-50 w-80 text-slate-900 text-center py-6 px-12 rounded shadow-lg">
          <h2 className="uppercase text-2xl">Total Entries:</h2>
          <p className="font-bold text-4xl mt-2">
            {appData.length + siteData.length}
          </p>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <div className="bg-slate-50 w-80 text-slate-900 text-center py-6 px-12 rounded shadow-lg">
          <h2 className="uppercase text-2xl">App Entries:</h2>
          <p className="font-bold text-4xl mt-2">{appData.length}</p>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <div className="bg-slate-50 w-80 text-slate-900 text-center py-6 px-12 rounded shadow-lg">
          <h2 className="uppercase text-2xl">Site Entries:</h2>
          <p className="font-bold text-4xl mt-2">{siteData.length}</p>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <div className="bg-slate-50 w-80 text-slate-900 text-center py-6 px-12 rounded shadow-lg">
          <h2 className="uppercase text-2xl">Corvette Entries:</h2>
          <p className="font-bold text-4xl mt-2">{corvetteData.length}</p>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <div className="bg-slate-50 w-80 text-slate-900 text-center py-6 px-12 rounded shadow-lg">
          <h2 className="uppercase text-2xl">Porsche Entries:</h2>
          <p className="font-bold text-4xl mt-2">{porscheData.length}</p>
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <div className="bg-slate-50 w-80 text-slate-900 text-center py-6 px-12 rounded shadow-lg">
          <h2 className="uppercase text-2xl">Lexus Entries:</h2>
          <p className="font-bold text-4xl mt-2">{lexusData.length}</p>
        </div>
      </div>
    </div>
  );
}
