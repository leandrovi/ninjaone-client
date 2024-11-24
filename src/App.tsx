import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DevicesProvider } from "./context/devices-context";
import { Header } from "./components/layout/header/header";
import { DeviceListHeader } from "./components/devices/device-list-header/device-list-header";
import { DeviceList } from "./components/devices/device-list/device-list";
import { DeviceListFilters } from "./components/devices/device-list-filters/device-list-filters";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DevicesProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="px-6">
            <DeviceListHeader />
            <section className="w-full flex flex-col gap-4 pb-6">
              <DeviceListFilters />
              <DeviceList />
            </section>
          </main>
        </div>
      </DevicesProvider>
    </QueryClientProvider>
  );
}

export default App;
