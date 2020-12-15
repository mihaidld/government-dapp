import React from "react";

// Layout displayed to everyone logged in to MetaMask to display rules of the token economy and the fictional country
function Rules() {
  return (
    <section className="mb-2">
      <hr />
      <h2 className="h2 text-primary mb-3 pt-3" id="rules">
        <span className="badge bg-primary">Rules</span>
      </h2>
      <div className="py-3">
        <article className="mb-3">
          <div className="shadow p-3">
            <h3 className="h3 mb-2">Token CITIZEN</h3>
            <ul className="p-3">
              <li>
                A token called <mark>CITIZEN</mark> (symbol <strong>CTZ</strong>
                , 18 decimals) serves as national currency and citizenship point
                inside this country.
              </li>
              <li>1 ETH == 100 CTZ.</li>
            </ul>
          </div>
        </article>
        <article className="mb-3">
          <div className="shadow p-3">
            <h3 className="h3 mb-2">Sovereign</h3>
            <ul className="p-3">
              <li>
                An entity which is the <mark>owner</mark> of the state, has the
                right to <em>register</em> and <em>unregister</em> companies and
                hospitals or to <em>denaturalize</em> citizens.
              </li>
              <li>
                It is minted, during token contract deployment, 100% of the
                total supply (1 million CTZ) and retains the right to{" "}
                <em>burn</em> or <em>mint</em> tokens CTZ in the future in order
                to regulate the economy.
              </li>
            </ul>
          </div>
        </article>
        <article className="mb-3">
          <div className="shadow p-3">
            <h3 className="h3 mb-2">Companies</h3>
            <ul className="p-3">
              <li>
                A <mark>company</mark> is identified by its Ethereum address
                and, in order to function, it must be first registered by the
                sovereign.
              </li>
              <li>
                A company can <em>buy</em> CTZ from the sovereign.
              </li>
              <li>
                A company can <em>recruit</em> employees among the registered
                citizens, <em>pay</em> them salaries in CTZ tokens and{" "}
                <em>dismiss</em> them.
              </li>
            </ul>
          </div>
        </article>
        <article className="mb-3">
          <div className="shadow p-3">
            <h3 className="h3 mb-2">Hospitals</h3>
            <ul className="p-3">
              <li>
                A <mark>hospital</mark> is identified by its Ethereum address
                and, in order to function, it must be first registered by the
                sovereign.
              </li>
              <li>
                A hospital can <em>change the health status</em> of a registered
                citizen between healthy and sick or declare the death of a
                citizen.
              </li>
            </ul>
          </div>
        </article>
        <article className="mb-3">
          <div className="shadow p-3">
            <h3 className="h3 mb-2">Citizens</h3>
            <p className="mb-2">
              The <mark>citizens</mark> are identified by their Ethereum address
              and can have different properties: alive / dead, healthy / sick,
              working / unemployed, an employer, a date when it's possible to
              ask for retirement etc.
            </p>
            <p className="mb-2">
              A citizen has also a balance of CTZ spread between a{" "}
              <em>current account</em>, an <em>unemployment insurance</em>,a{" "}
              <em>health insurance</em> and a <em>retirement insurance</em>.
              Only the current account is at the citizen's disposal.
            </p>
            <div>
              <h4 className="h4 mb-2">Life events :</h4>
              <ul className="p-3">
                <li>
                  A <em>new citizen</em> is awarded 100 CTZ which go into the
                  current account.
                </li>
                <li>
                  The <em>salary received</em> from an employer is spread as
                  follows: 10% for unemployment insurance, 10% for health
                  insurance, 10% for retirement insurance and the remaining 70%
                  into the current account.
                </li>
                <li>
                  On employer's <em>dismissal</em> all unemployment insurance
                  tokens are transfered into the current account.
                </li>
                <li>
                  On being declared <em>sick</em> by a hospital all health
                  insurance tokens are transfered into the current account.
                </li>
                <li>
                  At <em>retirement</em> (if above retirement age) all
                  unemployment insurance and retirement insurance tokens are
                  transferred into the current account.
                </li>
                <li>
                  On being declared <em>dead</em> by a hospital all tokens of
                  the deceased are given back to the sovereign.
                </li>
              </ul>
            </div>
          </div>
        </article>
        <p className="text-decoration-underline">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">Back to the top</a>
        </p>
      </div>
    </section>
  );
}

export default Rules;
