import logo from "../../assets/cssMobileImage.png";
import mainLogo from "../../assets/cssIM.png";

interface AuthLayoutProps {
  header: string;
  children: React.ReactNode;
}

const AuthLayout = ({ header, children }: AuthLayoutProps) => {
  return (
    <section className="bg-white overflow-y-auto">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 overflow-y-auto">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        </section>

        <main className="flex items-center  justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <div className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20">
                <span className="sr-only">Home</span>
                <img src={logo} alt="logo" />
              </div>
            </div>
            <div>
              <img
                src={mainLogo}
                alt="logo"
                className="w-30 h-24 hidden lg:block"
              />
            </div>
            <h1 className="mt-4 text-xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              {header}
            </h1>
            {children}
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
