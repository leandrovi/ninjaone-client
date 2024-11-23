import { Header } from "./components/layout/header/header";
import { DeviceListHeader } from "./components/devices/device-list-header/device-list-header";
import { DeviceList } from "./components/devices/device-list/device-list";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-6">
        <DeviceListHeader />
        <section className="w-full flex flex-col gap-4 pb-6">
          <DeviceList />
        </section>
      </main>
    </div>
  );
}

export default App;
