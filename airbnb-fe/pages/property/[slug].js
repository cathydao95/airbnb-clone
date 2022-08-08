import client from "../../client";
import { isMultiple } from "../../utils";
import Image from "../../components/Image";
import Link from "next/link";
import Review from "../../components/Review";
import Map from "../../components/Map";

function Property({
  title,
  location,
  propertyType,
  mainImage,
  images,
  pricePerNight,
  beds,
  bedrooms,
  description,
  host,
  reviews,
}) {
  const reviewAmount = reviews.length;
  console.log("mainImage", mainImage);

  return (
    <div className="container">
      <h1>{title}</h1>
      <p>
        {reviewAmount} review{isMultiple(reviewAmount)}
      </p>
      <div className="images-section">
        <Image identifier="main-image" image={mainImage} />

        <div className="sub-images-section">
          {/* {images.map((_key, image) => (
            <Image key={_key} identifier="image" image={image} />
          ))} */}
        </div>
      </div>
      <div className="section">
        <div className="information">
          <h2>
            <b>
              {propertyType} hosted by {host?.name}
            </b>
          </h2>
          <h4>
            {bedrooms} bedroom{isMultiple(bedrooms)} * {beds} bed
            {isMultiple(beds)}
          </h4>
          <hr />
          <h4>
            <b>Enhanced Clean</b>
          </h4>
          <p>
            This host is committed to Airbnb's 5-step enhanced cleaning process.
          </p>

          <h4>
            <b>House rules</b>
          </h4>
          <p>
            Guests and visitors should comply with the parking regulations and
            requirements and must show consideration to other vehicles in the
            neighborhood.
          </p>
        </div>
        <div className="price-box">
          <h2>${pricePerNight}</h2>
          <h4>
            {reviewAmount} review{isMultiple(reviewAmount)}
          </h4>
          <Link href="/">
            <div className="button">Change Destination</div>
          </Link>
        </div>
      </div>

      <hr />
      <h4>{description}</h4>
      <hr />
      <h2>
        {reviewAmount} review{isMultiple(reviewAmount)}
      </h2>
      {reviewAmount > 0 &&
        reviews.map((review) => <Review key={review._key} review={review} />)}
      <hr />
      <h2>Location</h2>
      <Map location={location} />
    </div>
  );
}

export async function getServerSideProps(pageContext) {
  const pageSlug = pageContext.query.slug;
  const query = `*[ _type == "property" && slug.current == $pageSlug][0]{
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host->{
      _id,
      name,
      slug,
      image
    },
    reviews[]{
      ...,
      traveler->{
        _id,
        name,
        slug,
        image
      }
    }
  }`;
  const property = await client.fetch(query, { pageSlug });
  console.log("!!!", property.reviews);
  console.log("222", JSON.parse(JSON.stringify(property.reviews)));

  if (!property) {
    return {
      props: null,
      notFound: true,
    };
  } else {
    return {
      props: {
        title: property.title,
        location: property.location,
        propertyType: property.propertyType,
        mainImage: property.mainImage,
        images: property.images,
        pricePerNight: property.pricePerNight,
        beds: property.beds,
        bedrooms: property.bedrooms,
        description: property.description,
        host: property.host,
        reviews: JSON.parse(JSON.stringify(property.reviews)),
        // why do we need to do this with review?
      },
    };
  }
}

export default Property;
