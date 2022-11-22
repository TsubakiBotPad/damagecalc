import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { MathJax } from "better-react-mathjax";
import { useState } from "react";
import { breakpoint } from "../breakpoints";
import { InputTable, VarType } from "../components/inputTable";
import { TitleBar } from "../components/titleBar";
import { FlexCol, FlexColC, H2, H3, HR2, Page } from "../stylePrimitives";

const maxPageWidth = "1440px";

const Frame = styled(FlexCol)`
  align-items: center;
  gap: 1em;
`;

function fixedDecimals(value: number, decimals: number = 2) {
  const f = Math.pow(10, decimals);
  return (Math.round(value * f) / f).toFixed(decimals);
}

interface DamageComponents {
  Atk: number | string;
  LSAtk: number | string;
  Combos: number | string;
  Awakenings: number | string;
  TeamEffects: number | string;
  SuperGravity: number | string;
}

const CapDisplay = ({ components, cap }: { components: DamageComponents; cap: number }) => {
  const leftoverComponents = [];
  var capCalc = cap;
  for (const [k, v] of Object.entries(components)) {
    const val = parseFloat(v);
    if (val === 0 || v === "") {
      leftoverComponents.push(`"${k}"`);
      continue;
    }
    capCalc /= v;
  }
  const capCalcDisplay = fixedDecimals(capCalc, 0);
  const leftoverDisplay = `${leftoverComponents.join(" xx ")} = ${capCalcDisplay} xx`;

  return (
    <MathJax renderMode={"pre"} typesettingOptions={{ fn: "asciimath2chtml" }} text={leftoverDisplay} inline dynamic />
  );
};

export const DamageEstimatorPage = () => {
  const [vars, setVars] = useState({
    Atk: { value: 4000 },
    LSAtk: { value: 676 },
    "LS+c": { value: 6 },
    Awakenings: { value: "" },
    TeamEffects: { value: "" },
    SuperGravity: { value: 1 }
  } as VarType);

  // const [vars2, setVars2] = useState({
  //   LeadStyle: { value: "combo" },
  //   BoardSize: { value: "6x5" }
  // } as VarType2);

  const formulaDisplay = `"Damage" = "ATK" xx "LSAtk" xx "BoardMatches" \
  xx "Awakenings" xx "TeamEffects"`;

  const components: DamageComponents = {
    Atk: vars["Atk"].value,
    LSAtk: vars["LSAtk"].value,
    Combos: 1 + 0.25 * (7 + parseFloat(vars["LS+c"].value as string) - 1),
    Awakenings: vars["Awakenings"].value,
    TeamEffects: vars["TeamEffects"].value,
    SuperGravity: vars["SuperGravity"].value
  };

  const EquationDisplay = styled.div`
    @media ${breakpoint.xs} {
      display: none;
    }
  `;

  const boardAssumptions = "Assumptions: Matched 7c, 1c on-color";
  return (
    <Page maxWidth={maxPageWidth}>
      <Frame>
        <TitleBar title="PAD Damage Estimator" />
        <H2>{boardAssumptions}</H2>
        <EquationDisplay>
          <MathJax
            renderMode={"pre"}
            typesettingOptions={{ fn: "asciimath2chtml" }}
            text={formulaDisplay}
            inline
            dynamic
          />
        </EquationDisplay>
        <InputTable inputs={vars} setInputs={setVars} />
        <span
          className={css`
            font-size: 14px;
          `}
        >
          <span
            className={css`
              font-weight: 500;
            `}
          >
            Instructions:
          </span>
          <br />0 = solve for this value
          <br />1 = no contribution from this value
        </span>
        <HR2 />
        <FlexColC>
          <H3>Single Cap: Main Attr</H3>
          <CapDisplay components={components} cap={Math.pow(2, 31)} />
        </FlexColC>

        <FlexColC>
          <H3>Single Cap: Subattr (1/3)</H3>
          <CapDisplay components={components} cap={Math.pow(2, 31) * 3} />
        </FlexColC>

        <FlexColC>
          <H3>Single Cap: Subattr (1/10)</H3>
          <CapDisplay components={components} cap={Math.pow(2, 31) * 10} />
        </FlexColC>

        <FlexColC>
          <H3>Double Cap: Main Attr</H3>
          <CapDisplay components={components} cap={Math.pow(2, 32)} />
        </FlexColC>

        <FlexColC>
          <H3>Double Cap: Subattr (1/3)</H3>
          <CapDisplay components={components} cap={Math.pow(2, 32) * 3} />
        </FlexColC>

        <FlexColC>
          <H3>Double Cap: Subattr (1/10)</H3>
          <CapDisplay components={components} cap={Math.pow(2, 32) * 10} />
        </FlexColC>

        <HR2 />

        <H2>More Info | Links</H2>
        <FlexColC>
          <a href="https://discord.gg/pad">PAD Discord</a>
          <a href="https://i.imgur.com/ucgaB1g.png">Damage Math Infographic</a>
        </FlexColC>
      </Frame>
    </Page>
  );
};
