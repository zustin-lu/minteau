import { useMemo, useState } from 'react';

import { fileToBase64 } from 'helpers';

export default function useImagePreview(images: Array<typeof File>) {
  const [previews, setPreviews] = useState<string[]>([]);

  useMemo(async () => {
    const imageStrings = (await Promise.all(
      images.map((i) => fileToBase64(i))
    )) as string[];
    setPreviews(imageStrings);
  }, [images]);

  return previews;
}
