import { Investment } from "./csvModels";

function sanitizedNumber(value: any) {
  return value ? value.numberValue : 0;
}

function nameToId(name: string) {
  return name.replaceAll(" ", "-").replaceAll(".", "").replaceAll(".", "");
}

export class PortcoRepository {
  data: Investment[];
  dataLoaded: boolean;

  constructor() {
    this.data = [];
    this.dataLoaded = false;
  }

  public loadData(rows: any[]) {
    if (this.dataLoaded) {
      return;
    }

    for (const r of rows.splice(1)) {
      if (!r.values[0].formattedValue) {
        continue;
      }

      this.data.push({
        company_id: nameToId(r.values[0].formattedValue),
        company_name: r.values[0].formattedValue,
        source: r.values[1].formattedValue,
        invested_year: r.values[2].formattedValue,
        invested_total: sanitizedNumber(r.values[3].userEnteredValue),
        morai_usd: sanitizedNumber(r.values[4].userEnteredValue),
        ethan_usd: sanitizedNumber(r.values[5].userEnteredValue),
        roland_usd: sanitizedNumber(r.values[6].userEnteredValue),
        zhixin_usd: sanitizedNumber(r.values[7].userEnteredValue),
        xurui_usd: sanitizedNumber(r.values[8].userEnteredValue),
        sharleen_usd: sanitizedNumber(r.values[9].userEnteredValue),
        john_usd: sanitizedNumber(r.values[10].userEnteredValue),
        chris_usd: sanitizedNumber(r.values[11].userEnteredValue),
        chiehhan_usd: sanitizedNumber(r.values[12].userEnteredValue)
      });
    }

    this.dataLoaded = true;
  }

  public get hasDataLoaded() {
    return this.dataLoaded;
  }

  public get companies() {
    return this.data;
  }

  public companyById(id: string) {
    return this.data.filter((a) => a.company_id === id)[0];
  }
}

export const portcoRepo = new PortcoRepository();
