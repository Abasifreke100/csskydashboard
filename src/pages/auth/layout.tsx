import mainLogo from "../../assets/cssIM.png";
import loginTile from "../../assets/login-tile.png";

interface AuthLayoutProps {
  header: string;
  children: React.ReactNode;
}

const AuthLayout = ({ header, children }: AuthLayoutProps) => {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className=" hidden lg:block h-16  lg:order-last lg:col-span-6 lg:h-full">
          <div className="h-full w-full flex items-center justify-center px-3">
            <img
              alt=""
              src={loginTile}
              className=" lg:h-[90%] w-full xl:w-[75%]"
            />
          </div>
        </aside>
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-6 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <img src={mainLogo} alt="logo" className="w-30 h-24 " />

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
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
