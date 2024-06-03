export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-100">
          <div className="bg-white shadow-xl rounded-xl flex flex-col md:flex-row w-full max-w-4xl">
            <div className="md:w-1/2 p-6 flex items-center justify-center rounded-xl">
              <img src={"/images/login-page.jpg"} alt="Illustration" className="w-full h-auto rounded-xl" />
            </div>
            <div className="md:w-1/2 p-16">
              <div className="text-center">
                {/* <img src="" alt="Logo" className="mx-auto mb-4" /> */}
                <p className="text-xl font-extrabold text-blue-900 mb-6">GOYALO SAFARIS</p>
                <p className="text-blue-600 font-bold">Login</p>
              </div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-zinc-700">Email</label>
                  <input type="text" id="username" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-zinc-700">Password</label>
                  <input type="password" id="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800">Login</button>
              </form>
              <div className="text-center mt-4">
                <p className="text-red-600 text-xs">Do not have an account? <a href="#" className="text-red-600 text-sm">Sign Up</a></p>
              </div>
            </div>
          </div>
        </div>
    )
}