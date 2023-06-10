import { Link } from "react-router-dom";

interface LoginFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setLogin: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export function LoginForm({ handleSubmit, setLogin, setPassword }: LoginFormProps) {
  return (
    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-neutral-900 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-100 bg-neutral-700"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              inputMode="text"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-100 bg-neutral-700"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-300 cursor-pointer"
              >
                Remember me
              </label>
            </div>
          </div>
          <div>
            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600"
              type="submit"
            >
              Sign in
            </button>
          </div>
          <div>
            <Link
              to="/register"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white "
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}