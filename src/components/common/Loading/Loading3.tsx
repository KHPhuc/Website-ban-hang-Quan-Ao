export function Loading3(props: any) {
  return props.loading ? (
    <div className="loading-container">
      <div className="preloader-active">
        <div className="preloader1">
          <div className="loader1">
            <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
              <symbol id="s--circle">
                <circle r="10" cx="20" cy="20"></circle>
              </symbol>
              <g className="g-circles g-circles--loading">
                <g className="g--circle">
                  <use xlinkHref="#s--circle" className="u--circle"></use>
                </g>
                <g className="g--circle">
                  <use xlinkHref="#s--circle" className="u--circle"></use>
                </g>
                <g className="g--circle">
                  <use xlinkHref="#s--circle" className="u--circle"></use>
                </g>
                <g className="g--circle">
                  <use xlinkHref="#s--circle" className="u--circle"></use>
                </g>
                <g className="g--circle">
                  <use xlinkHref="#s--circle" className="u--circle"></use>
                </g>
                <g className="g--circle">
                  <use xlinkHref="#s--circle" className="u--circle"></use>
                </g>
                <g className="g--circle">
                  <use xlinkHref="#s--circle" className="u--circle"></use>
                </g>
                <g className="g--circle">
                  <use xlinkHref="#s--circle" className="u--circle"></use>
                </g>
                <g className="g--circle">
                  <use xlinkHref="#s--circle" className="u--circle"></use>
                </g>
                <g className="g--circle">
                  <use xlinkHref="#s--circle" className="u--circle"></use>
                </g>
                <g className="g--circle">
                  <use xlinkHref="#s--circle" className="u--circle"></use>
                </g>
                <g className="g--circle">
                  <use xlinkHref="#s--circle" className="u--circle"></use>
                </g>
              </g>
            </svg>
            <p>{props.tip}</p>
          </div>
          
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
