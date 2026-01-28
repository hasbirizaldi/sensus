import { useState } from "react";

export default function App() {
  const [dataBangsal, setDataBangsal] = useState({});
  const [bangsal, setBangsal] = useState("");
  const [dokterTerpilih, setDokterTerpilih] = useState([]);

  const daftarBangsal = ["Fahrudin", "Al Ma'un", "Chamdani", "Salamah", "Khotijah", "ICU", "Poli"];

  const daftarDokter = [
    "Adi",
    "Alam",
    "Andi",
    "Andreas",
    "Anwar",
    "Aziz",
    "Desi",
    "Faisal",
    "Haryono",
    "Inet",
    "Inkoni",
    "Iwan",
    "Jalul",
    "Khalifa",
    "Khayati",
    "Levi",
    "Ricky",
    "Sari Anak",
    "Sari Jantung",
    "Satya",
    "Tri Hastuti",
    "Vida",
    "Windy",
    "Yayan",
  ];

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });



  // dokter unik untuk filter
  const allDokter = Array.from(new Set(Object.values(dataBangsal).flat()));

  const handleCheckbox = (nama) => {
    setDokterTerpilih((prev) => (prev.includes(nama) ? prev.filter((d) => d !== nama) : [...prev, nama]));
  };

  const handleTambah = () => {
    if (!bangsal || dokterTerpilih.length === 0) return;

    setDataBangsal((prev) => {
      const prevDokter = prev[bangsal] || [];
      return {
        ...prev,
        [bangsal]: Array.from(new Set([...prevDokter, ...dokterTerpilih])).sort(),
      };
    });

    setDokterTerpilih([]);
  };

  const handleCopy = async () => {
    if (Object.keys(dataBangsal).length === 0) return;

    let text = `Operan ${today}\n\n`;

    Object.entries(dataBangsal).forEach(([namaBangsal, dokter]) => {
      const dokterText = dokter.join(", ").replace(/, ([^,]*)$/, ", dan $1");
      text += `${namaBangsal} : ${dokterText}\n`;
    });

    try {
      await navigator.clipboard.writeText(text);
      alert("Data operan berhasil disalin mantap");
    } catch (err) {
      alert("Gagal menyalin data");
    }
  };

  const handleCopyBangsal = (bangsal) => {
  if (bangsal.length === 0) return;

  const text = bangsal.join(", ").replace(/, ([^,]*)$/, ", dan $1");

  navigator.clipboard.writeText(text)
    .then(() => alert("Bangsal berhasil disalin Ngeeeng"))
    .catch(() => alert("Gagal menyalin"));
};



  return (
    <div className="min-h-screen bg-slate-200 lg:p-2 p-2">
      <div className="bg-slate-200 rounded-2xl w-full lg:max-w-8xl">
        <h1 className="text-2xl font-bold text-center text-slate-950 mb-3">Manajemen Sensus Dokter</h1>
        <div className="">
          {/* INPUT */}
          <div className="">
            <div className="border-2 border-green-700 bg-white rounded-xl p-4 space-y-4 mb-5 w-[70%] mx-auto">
              <label htmlFor="" className="font-semibold">Pilih bangsal</label>
              <select value={bangsal} onChange={(e) => setBangsal(e.target.value)} className="w-full border rounded p-2 font-semibold cursor-pointer">
                <option value="">-- Pilih Bangsal --</option>
                {daftarBangsal.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-4 gap-4 max-h-84 overflow-y-auto border rounded-lg p-6">
                {daftarDokter.map((d) => (
                  <label key={d} className="flex items-center gap-2 text-base font-semibold cursor-pointer">
                    <input type="checkbox" checked={dokterTerpilih.includes(d)} onChange={() => handleCheckbox(d)} />
                    {d}
                  </label>
                ))}
              </div>

              <button onClick={handleTambah} className="w-full bg-green-600 text-white rounded-lg p-2 font-semibold hover:bg-green-700 cursor-pointer">
                SIMPAN
              </button>
            </div>
            {/* SEMUA BANGSAL + DOKTER (AUTO TAMPIL) */}
            <div className="border-2 border-green-700 bg-white rounded-xl px-4 py-6 mb-5 space-y-3 w-[80%] mx-auto">
              
              <div className="flex justify-between">
                <h2 className="font-semibold">
                Operan  <span >{today}</span>
                </h2>
                <button className="bg-slate-600 cursor-pointer text-white font-semibold px-6 rounded py-1"  onClick={handleCopy}>Copy</button>

                </div>
                {Object.keys(dataBangsal).length === 0 && <p className="text-slate-500 text-sm">Belum ada data</p>}

              {Object.entries(dataBangsal).map(([namaBangsal, dokter]) => (
                <div key={namaBangsal} className="">
                <p className="grid grid-cols-[100px_10px_1fr] gap-1 mb-1">
                  <span className="font-bold">{namaBangsal}</span>
                  <span className="font-bold">:</span>
                  <span>
                    {dokter.map((d, i) => (
                      <span key={d} className="font-normal">
                        {d}
                        {i < dokter.length - 2 && ", "}
                        {i === dokter.length - 2 && ", dan "}
                      </span>
                    ))}
                  </span>
                </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* DAFTAR DOKTER & BANGSAL (CARD) */}
            <div className="border-2 border-green-700 bg-white rounded-xl p-4 space-y-4 w-[90%] mx-auto">
              <h2 className="font-semibold">Dokter & Bangsal Bertugas</h2>

              {allDokter.length === 0 && <p className="text-sm text-slate-500">Belum ada data dokter</p>}

              <div className="grid md:grid-cols-2 gap-4">
                {allDokter.map((dokter) => {
                  const bangsal = Object.keys(dataBangsal).filter((b) => dataBangsal[b].includes(dokter));

                  return (
                    <div key={dokter} className="border rounded-xl p-4 bg-white shadow-lg">
                      <div className="flex justify-between">
                        <p className="font-bold text-blue-600 mb-2">dr. {dokter}</p>
                        <button  onClick={() => handleCopyBangsal(bangsal)} className="bg-slate-600 cursor-pointer text-white font-semibold px-6 rounded py-1"  >Copy</button>
                      </div>
                      <p className="text-slate-950">
                        {bangsal.map((b, i) => (
                          <span key={b}>
                            {b}
                            {i < bangsal.length - 2 && ", "}
                            {i === bangsal.length - 2 && ", dan "}
                          </span>
                        ))}
                      </p>

                      <p className="text-xs text-slate-500 mt-2">Total bangsal: {bangsal.length}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-slate-800 mt-4">
          Created with 💖 by{" "}
          <a href="https://brewokode.com" className="text-blue-600 underline">
            Hasbi R
          </a>
        </p>
      </div>
    </div>
  );
}
