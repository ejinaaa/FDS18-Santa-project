/* eslint-disable indent */
export const postPublisherInfo = data => {
  return {
    imageURL: data.imageURL,
    publisherName: data.publisherInfo.name,
  };
};

export const postHeading = data => {
  const { title, postDate, views } = data;

  return {
    title,
    postDate,
    views,
  };
};

export const recruitPostContents = data => {
  const {
    mountainName,
    recruitDate,
    recruitingGender,
    recruitingAge,
    hikingLevel,
    recruitingNumber,
    description,
  } = data;
  const contentsData = {
    mountainName,
    recruitDate,
    recruitingGender:
      recruitingGender === 'female'
        ? '여성'
        : recruitingGender === 'male'
        ? '남성'
        : '상관없음',
    recruitingAge: `${recruitingAge[0]}~${recruitingAge[1]}세`,
    hikingLevel,
    recruitingNumber: `${recruitingNumber}명`,
    description,
  };

  const contentsDataValues = Object.entries(contentsData);

  return contentsDataValues;
};