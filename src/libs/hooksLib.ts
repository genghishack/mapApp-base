import {useEffect, useRef, useState} from 'react';

export const useFormFields = (initialState) => {
  const [fields, setValues] = useState(initialState);
  return [
    fields,
    (evt) => {
      setValues({
        ...fields,
        [evt.target.id]: evt.target.value
      })
    }
  ]
}

export const useIsMountedRef = () => {
  const isMountedRef = useRef(null);
  //@ts-ignore
  useEffect(() => {
    //@ts-ignore
    isMountedRef.current = true;
    //@ts-ignore
    return () => isMountedRef.current = false;
  });
  return isMountedRef;
}
