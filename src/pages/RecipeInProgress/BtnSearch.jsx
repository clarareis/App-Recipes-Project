import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory, useParams } from 'react-router-dom';

function BtnSearch() {
  const [copied, setCopied] = useState(false);
  const history = useHistory();
  const keyOfInprogress = () => {
    if (history.location.pathname.includes('foods')) {
      return 'meals';
    }
    return 'cocktails';
  };

  const { id } = useParams();

  const shareRecipe = () => {
    const MSG_TIMEOUT = 3000;
    setCopied(true);
    copy(`${window.location.origin}/${keyOfInprogress() === 'meals'
      ? 'foods' : 'drinks'}/${id}`);
    setTimeout(() => setCopied(false), MSG_TIMEOUT);
  };
  return (
    <section>
      {copied && (<span>Link copied!</span>)}
      <button
        onClick={ () => shareRecipe() }
        type="button"
        className="shareBtn"
        data-testid="share-btn"
      >
        Share
      </button>

    </section>
  );
}

export default BtnSearch;
