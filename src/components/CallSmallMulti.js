import { useRef, useEffect } from "react";

import SmallMultiples from "./SmallMultiples";

function CallSmallMulti({ data }) {
  var svgRef = useRef(null);

  useEffect(() => {
    SmallMultiples({ data, svgRef }, {});
  }, [data]);

  return (
    <div className="small-multiples">
      <svg ref={svgRef} />
    </div>
  );
}

export default CallSmallMulti;
