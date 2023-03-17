import { useState, useEffect } from "react";
import Image from "next/image";

import { sebringApp, sebringSite } from "@/firebase/db";
import { getDocs, onSnapshot } from "firebase/firestore";

import logo from "../../public/ue-logo.png";

export async function getServerSideProps() {
  const initialSiteData = await getData(sebringSite);
  const initialAppData = await getData(sebringApp);

  async function getData(ref) {
    const snapshot = await getDocs(ref);
    const data = snapshot.docs.map((doc) => doc.data());

    return data;
  }

  return {
    props: {
      initialSiteData,
      initialAppData,
    },
  };
}

export default function Home({ initialAppData, initialSiteData }) {
  const [appData, setAppData] = useState(initialAppData);
  const [siteData, setSiteData] = useState(initialSiteData);

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    const siteUnsub = onSnapshot(sebringSite, (querySnapshot) => {
      setSiteData(querySnapshot.docs.map((doc) => doc.data()));
    });
    const appUnsub = onSnapshot(sebringApp, (querySnapshot) => {
      setAppData(querySnapshot.docs.map((doc) => doc.data()));
    });

    return () => {
      siteUnsub();
      appUnsub();
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#0066b3] to-[#003c65] h-screen">
      <div className="w-2/12 mx-auto pt-6">
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
      <div className="flex justify-center">
        <div className="bg-slate-50 w-80 text-slate-900 text-center py-6 px-12 rounded shadow-lg">
          <h2 className="uppercase text-2xl">Site Entries:</h2>
          <p className="font-bold text-4xl mt-2">{siteData.length}</p>
        </div>
      </div>
    </div>
  );
}
