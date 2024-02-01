import { useEffect, useState } from "react";

const URL_CHALLENGE =
  "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge";

export default function useUrlFlag() {
  const [urlFlag, setUrlFlag] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(URL_CHALLENGE)
      .then(async (response) => await response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        let url = "";

        // Pattern of DOM Tree
        // <code data-class="23*">
        //   <div data-tag="*93">
        //     <span data-id="*21*">
        //       <i class="char" value="VALID_CHARACTER"></i>
        //     </span>
        //   </div>
        // </code>

        const iArr = Array.from(doc.getElementsByTagName("i"));

        iArr.forEach((i) => {
          const parent = i.parentElement;
          if (parent?.tagName === "SPAN") {
            const spanAttribute = parent.getAttribute("data-id");
            if (spanAttribute?.includes("21") ?? false) {
              const grandParent = parent.parentElement;
              const divAttribute = grandParent?.getAttribute("data-tag");
              if (
                grandParent?.tagName === "DIV" &&
                divAttribute?.endsWith("93")
              ) {
                const greatGrandParent = grandParent.parentElement;
                const codeAttribute =
                  greatGrandParent?.getAttribute("data-class");
                if (
                  greatGrandParent?.tagName === "CODE" &&
                  codeAttribute?.startsWith("23")
                ) {
                  url += i.getAttribute("value");
                }
              }
            }
          }
        });

        setUrlFlag(url);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { urlFlag, isLoading, error };
}
