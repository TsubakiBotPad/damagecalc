import styled from "@emotion/styled";

const Disclaimer = styled.span`
  font-size: 0.75rem;
`;

export const Footer = () => {
  return (
    <Disclaimer>
      ethangoh.com and its affiliates do not provide tax, legal or accounting advice. This material has been prepared
      for informational purposes only, and is not intended to provide, and should not be relied on for, tax, legal or
      accounting advice. You should consult your own tax, legal and accounting advisors before engaging in any
      transaction.
    </Disclaimer>
  );
};
