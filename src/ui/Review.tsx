type reviewTypes = {
  _id: string;
  headline: {
    main: string;
  };
  snippet: string;
  lead_paragraph: string;
  web_url: string;
};

type componentTypes = {
  index: number;
  review: reviewTypes;
};

function Review({ index, review }: componentTypes) {
  return (
    <li className="review" key={review._id}>
      <h5>
        <span>{index + 1}</span> {review.headline.main}
      </h5>
      <div className="summary">
        <h5>summary</h5>
        <p>{review.snippet}</p>
      </div>
      <div className="full-review">
        <h6>Full Review</h6>
        <p>{review.lead_paragraph}</p>
        <a href={review.web_url}>view all review from here &rarr;</a>
      </div>
    </li>
  );
}

export default Review;
