export interface InvestmentRaw {
  company_name: string;
  source: string;
  invested_year: number;
  invested_total: number;
  morai_usd: number;
  ethan_usd: number;
  roland_usd: number;
  zhixin_usd: number;
  xurui_usd: number;
  sharleen_usd: number;
  john_usd: number;
  chris_usd: number;
  chiehhan_usd: number;
}

export interface Investment extends InvestmentRaw {
  company_id: string;
}

export interface RelationRaw {
  edge_id: string;
  name_source: string;
  name_target: string;
  relationship: string;
}

export enum IdentityRelationship {
  MARRIED_TO = "married-to",
  "FRIEND_OF" = "friend-of",
  "SIBLING_OF" = "sibling-of",
  "WORK_FRIEND_OF" = "work-friend-of",
  "PLUS_ONE_OF" = "plus-one-of"
}

export enum PrimaryRelationship {
  CHILD_OF = "child-of",
  STEP_CHILD_OF = "step-child-of"
}

export enum SecondaryRelationship {
  PARENT_OF = "parent-of",
  STEP_PARENT_OF = "step-parent-of"
}

export const RelationKeyInverses: {
  [key in PrimaryRelationship]: SecondaryRelationship;
} & { [key in IdentityRelationship]: IdentityRelationship } = {
  [PrimaryRelationship.CHILD_OF]: SecondaryRelationship.PARENT_OF,
  [PrimaryRelationship.STEP_CHILD_OF]: SecondaryRelationship.STEP_PARENT_OF,
  [IdentityRelationship.MARRIED_TO]: IdentityRelationship.MARRIED_TO,
  [IdentityRelationship.FRIEND_OF]: IdentityRelationship.FRIEND_OF,
  [IdentityRelationship.SIBLING_OF]: IdentityRelationship.SIBLING_OF,
  [IdentityRelationship.WORK_FRIEND_OF]: IdentityRelationship.WORK_FRIEND_OF,
  [IdentityRelationship.PLUS_ONE_OF]: IdentityRelationship.PLUS_ONE_OF
};

export type Relationship = IdentityRelationship | PrimaryRelationship | SecondaryRelationship;

export const assertPrimaryRelationship = (s: string): PrimaryRelationship | IdentityRelationship => {
  const possibleTypes = enumFromStringValue(IdentityRelationship, s) ?? enumFromStringValue(PrimaryRelationship, s);

  if (possibleTypes === undefined) {
    throw new Error(`${s} is not a known type of primary relationship`);
  }
  return possibleTypes;
};

export const assertRelationship = (s: string): Relationship => {
  const maybeRelationship = relationshipFromString(s);
  if (maybeRelationship === undefined) {
    throw new Error(`${s} is not a known type of relationship`);
  }
  return maybeRelationship as Relationship;
};

export const relationshipFromString = (s: string): Relationship | undefined => {
  return (
    enumFromStringValue(IdentityRelationship, s) ??
    enumFromStringValue(PrimaryRelationship, s) ??
    enumFromStringValue(SecondaryRelationship, s)
  );
};

function enumFromStringValue<T>(enm: { [s: string]: T }, value: string): T | undefined {
  return (Object.values(enm) as unknown as string[]).includes(value) ? (value as unknown as T) : undefined;
}
