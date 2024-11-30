import classNames from 'classnames/bind';
import styles from './Vocabularies.module.scss';
import CustomCarousel from '../CustomCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { toggleComplete, vocabularyList } from '~/redux/features/vocabulariesSlice';
import VocabularyCard from '../VocabularyCard';
import { useEffect, useState } from 'react';
import ErrorFieldsProvider from '~/context/ErrorFieldsProvider';

const cx = classNames.bind(styles);

const Vocabularies = ({ className }) => {
  const vocabularies = useSelector(vocabularyList);
  const dispatch = useDispatch();

  const items = vocabularies.map((vocabulary) => <VocabularyCard key={vocabulary.id} data={vocabulary} />);
  const [errorFields, setErrorFields] = useState({});

  const validateVocabularies = () => {
    let complete = true;
    const errors = {};

    if (vocabularies.length === 0) complete = false;

    vocabularies.forEach((vocab) => {
      if (!vocab.definition) {
        complete = false;
        errors[`definition_${vocab.id}`] = 'Empty definition';
      }

      if (!vocab.pronunciation) {
        complete = false;
        errors[`pronunciation_${vocab.id}`] = 'Empty pronunciation';
      }
    });

    dispatch(toggleComplete({ toggle: complete }));
    setErrorFields(errors);
  };

  useEffect(() => {
    validateVocabularies();
    // eslint-disable-next-line
  }, [vocabularies]);

  return (
    <ErrorFieldsProvider errorFields={errorFields}>
      <CustomCarousel
        data-bs-theme="dark"
        interval={null}
        slide={false}
        className={cx('container', className)}
        items={items}
      />
    </ErrorFieldsProvider>
  );
};

export default Vocabularies;
