import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import { ColorKey, getColor } from "../colors";
import { useBackgroundColor } from "../hooks/useBackgroundColor";
import { useTextColor } from "../hooks/useTextColor";
import { FlexCol, FlexRow, H1, Page } from "../stylePrimitives";

const Frame = styled(FlexCol)`
  align-items: center;
  gap: 1em;
`;

const maxPageWidth = "1440px";

export const Index = () => {
  useBackgroundColor(getColor(ColorKey.BACKGROUND));
  useTextColor(getColor(ColorKey.PRIMARY));

  return (
    <Page maxWidth={maxPageWidth}>
      <Frame>
        <H1>
          <FlexRow gap={"1rem"}>
            <span>calculators | tsubakibot</span>{" "}
          </FlexRow>
        </H1>
        <FlexCol>
          <Link to="/damage-estimator">PAD Damage</Link>
        </FlexCol>
      </Frame>
    </Page>
  );
};
