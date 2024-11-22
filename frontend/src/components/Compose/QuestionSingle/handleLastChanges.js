import { logFields } from '~/redux/features/testSlice';

const getLastChangesByField = (eventLogs, field, keyGenerator) => {
  return Object.values(
    eventLogs
      .filter((log) => log.field === field)
      .reduce((acc, log) => {
        const key = keyGenerator(log);
        if (!acc[key]) acc[key] = [];
        acc[key].push(log);
        return acc;
      }, {}),
  )
    .map((group) => {
      const firstChange = group[0];
      const lastChange = group[group.length - 1];
      return firstChange.oldValue !== lastChange.newValue ? { ...lastChange, oldValue: firstChange.oldValue } : null;
    })
    .filter((change) => change !== null);
};

const handleLastChanges = {
  answers: (eventLogs) =>
    getLastChangesByField(eventLogs, logFields.answer, (log) => `${log.questionId}-${log.answerId}`),
  correctAnswers: (eventLogs) => getLastChangesByField(eventLogs, logFields.correctAnswer, (log) => log.questionId),
  photo: (eventLogs) => getLastChangesByField(eventLogs, logFields.photo, (log) => log.questionId),
  audio: (eventLogs) => getLastChangesByField(eventLogs, logFields.audio, (log) => log.questionId),
  questionText: (eventLogs) => getLastChangesByField(eventLogs, logFields.questionText, (log) => log.questionId),
};

export default handleLastChanges;
