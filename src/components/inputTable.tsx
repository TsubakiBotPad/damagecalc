import styled from "@emotion/styled";

const TD = styled.td`
  padding: 0.25rem 1rem;
`;

export interface VarType {
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
                  onChange={(e) => {
                    var valueString = "";
                    if (e.currentTarget.value) {
                      var val = parseFloat(e.currentTarget.value);
                      valueString = val.toString();
                    }

                    var newCosts = { ...inputs };
                    newCosts[v] = { ...newCosts[v], value: valueString };
                    setInputs(newCosts);
                  }}
                  value={inputs[v].value ?? ""}
                  placeholder="Unknown"
                />
              </TD>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
