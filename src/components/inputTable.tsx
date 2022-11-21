import styled from "@emotion/styled";

const TD = styled.td`
  padding: 0.25rem 1rem;
`;

export interface VarType {
  [key: string]: { value: number; step?: string };
}

export interface VarType2 {
  [key: string]: { value: number | string; step?: string };
}

export const InputTable = ({
  inputs,
  setInputs
}: {
  inputs: VarType;
  setInputs: (value: React.SetStateAction<VarType>) => void;
}) => {
  return (
    <table>
      <tbody>
        {Object.keys(inputs).map((v) => {
          return (
            <tr>
              <TD>{v}</TD>
              <TD>
                <input
                  type="number"
                  step={inputs[v].step ?? "1"}
                  onChange={(e) => {
                    var val = 0;
                    if (e.currentTarget.value) {
                      val = parseFloat(e.currentTarget.value);
                    }

                    var newCosts = { ...inputs };
                    newCosts[v] = { ...newCosts[v], value: val };
                    setInputs(newCosts);
                  }}
                  value={inputs[v].value ?? 0}
                />
              </TD>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
