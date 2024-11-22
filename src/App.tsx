import { Header } from "./components/layout/header/header";
import { DeviceListHeader } from "./components/devices/device-list-header/device-list-header";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-6">
        <DeviceListHeader />
      </main>
    </div>
  );
}

export default App;
