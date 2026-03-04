import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-200 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Profile Admin
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500">Nama</p>
            <p className="font-semibold text-lg">Admin Informasi</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="font-semibold text-lg">admin@rspku.com</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Role</p>
            <p className="font-semibold text-lg">Administrator</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Kembali ke Dashboard
        </button>
      </div>
    </div>
  );
}