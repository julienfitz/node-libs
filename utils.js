function getTemplate(userAnswers, value) {
  let template = '';
  let arrayLength = value.length;

  let endsOnUserInput = userAnswers.length === arrayLength;

  for (i = 0; i < arrayLength; i++) {
    template += value[i];

    if (i < arrayLength - 1) {
      template += userAnswers[i];
    }

    if (endsOnUserInput && i === (arrayLength - 1)) {
      template += userAnswers[i];
    }
  }

  return template;
}

module.exports = { getTemplate };
