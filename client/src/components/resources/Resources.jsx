import React from 'react';

export default function Resources() {
  return (
    <div className='Resources mainPage'>
      <h1>Resources</h1>

      <p className='resourceMsg'>These are some of my favorite resources for diabetes info and support.</p>

      <div className='prefsTile'>
        <a rel='noopener noreferrer' href='https://cheapinsulin.org/' target='_blank'>
          <p className='bubbleTitle rscTitle'>Cheap Insulin Foundation</p>
          <p className='rscSubTitle'>cheapinsulin.org</p>
        </a>
      </div>

      <div className='prefsTile'>
        <a rel='noopener noreferrer' href='https://www.nightscoutfoundation.org/' target='_blank'>
          <p className='bubbleTitle rscTitle'>The Nightscout Foundation</p>
          <p className='rscSubTitle'>nightscoutfoundation.org</p>
        </a>
      </div>

      <div className='prefsTile'>
        <a rel='noopener noreferrer' href='https://healthfinder.gov/FindServices/SearchContext.aspx?topic=2661' target='_blank'>
          <p className='bubbleTitle rscTitle'>HealthFinder.gov</p>
          <p className='rscSubTitle'>healthfinder.gov</p>
        </a>
      </div>

      <div className='prefsTile'>
        <a rel='noopener noreferrer' href='https://clinicaltrials.gov/' target='_blank'>
          <p className='bubbleTitle rscTitle'>ClinicalTrials.gov</p>
          <p className='rscSubTitle'>clinicaltrials.gov</p>
        </a>
      </div>

      <div className='prefsTile'>
        <a rel='noopener noreferrer' href='https://diatribe.org/' target='_blank'>
          <p className='bubbleTitle rscTitle'>diaTribe Foundation</p>
          <p className='rscSubTitle'>diatribe.org</p>
        </a>
      </div>

    </div>
  );
}