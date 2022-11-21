import { portcoRepo } from "./portcoRepository";

const baseDocId2 = "1inJp1IWWedYh07rBE4qjQh64IbG_RlmHP9b2m-BPTVk";

export async function downloadData(authToken: string) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${baseDocId2}?`;
  var params = {
    ranges: "Investments!A:M",
    includeGridData: "true"
  };

  const resp = await fetch(url + new URLSearchParams(params), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`
    }
  });

  const j = await resp.json();
  const data = j.sheets[0].data[0].rowData;
  portcoRepo.loadData(data);
}
