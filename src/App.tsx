import { MathJaxContext } from "better-react-mathjax";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Index } from "./pages";
import { PADDamagePage } from "./pages/padDamage";

const config = {
  loader: { load: ["input/asciimath"] },
  asciimath: {
    displaystyle: true,
    delimiters: [
      ["$", "$"],
      ["`", "`"]
    ]
  }
};

export const App = () => {
  return (
    <MathJaxContext config={config}>
      <HashRouter>
        <Routes>
          <Route path="/pad-damage" element={<PADDamagePage />} />
          <Route path="/" element={<Index />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </MathJaxContext>
  );
};
