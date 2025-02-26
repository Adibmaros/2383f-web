import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div
        className="max-w-md w-full space-y-8 
        bg-white dark:bg-gray-800 
        p-8 rounded-xl shadow-lg"
      >
        <div>
          <h2
            className="text-center text-3xl font-bold 
            text-gray-900 dark:text-white"
          >
            Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">Silahkan login sebagai anggota kelas 2383F</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
