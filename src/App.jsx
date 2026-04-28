import Container from "./components/Container";
import Headers from "./components/Headers";
import InputText from "./components/InputText";
import WeatherProvider from "./provider/WeatherProvider";

const App = () => {
  return (
    <div className="bg-main-bg flex min-h-dvh w-full flex-col overflow-x-hidden">
      <WeatherProvider>
        <Headers />
        <InputText />
        <Container />
      </WeatherProvider>
    </div>
  );
};

export default App;
