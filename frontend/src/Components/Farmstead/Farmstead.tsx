import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Data from '../../data/farmsteadData.json';
import ReactMarkdown from 'react-markdown'

interface FarmsteadType {
    id: string;
    img: string;
    title: string;
    text: string;
}

const defaultFarmset: FarmsteadType = {
    id: '0',
    img: 'undefined',
    title: 'Cтраница не найдена',
    text: '',
};

export function Farmstead() {
    const [markdown, setMarkdown] = useState("");
    const params = useParams();
    const prodId = params.id;
    const ElementData: FarmsteadType =
        Data.find((element) => element.id === prodId) || defaultFarmset;
    const [readData, setReadData] = useState<string>('');

    useEffect(() => {
        fetch(`../src/data/FarmSteadInfo/${ElementData.text}`)
          .then((res) => res.text())
          .then((text) => setMarkdown(text));
      }, []);

  return (
    <>
      <ReactMarkdown children={markdown} />
    </>
  );
}
