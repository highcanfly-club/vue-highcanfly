import sanityClient from "@sanity/client";
import { AsyncWalkBuilder } from 'walkjs';

// usage:
//const data = await sanityClient.fetch(`your query`);
//await replaceReferences(data, sanityClient)
/**
 * This function will mutate reference-objects:
 * The keys of a reference-object will be deleted and the keys of the reference-
 * document will be added.
 * eg:
 * { _type: 'reference', _ref: 'abc' }
 * becomes:
 * { _type: 'document', _id: 'abc', ...allOtherDocumentProps }
 */
 async function sanityReplaceReferences( //eslint-disable-line
  input,
  client,
  resolvedIds = [],
) {
  await new AsyncWalkBuilder()
    .withGlobalFilter((x) => x.val?._type === 'reference')
    .withSimpleCallback(async (node) => {
      const refId = node.val._ref;

      if(typeof refId !== 'string') {
        throw new Error('node.val._ref is not set');
      }

      if (resolvedIds.includes(refId)) {
        const ids = `[${resolvedIds.concat(refId).join(',')}]`;
        throw new Error(
          `Ran into an infinite loop of references, please investigate the following sanity document order: ${ids}`
        );
      }

      const doc = await client.fetch(`*[_id == '${refId}']{...}[0]`);

      // recursively replace references
      await sanityReplaceReferences(doc, client, resolvedIds.concat(refId)); //eslint-disable-line

      /**
       * Here we'll mutate the original reference object by clearing the
       * existing keys and adding all keys of the reference itself.
       */
      Object.keys(node.val).forEach((key) => delete node.val[key]);
      Object.keys(doc).forEach((key) => (node.val[key] = doc[key]));
    })
    .walk(input);
}


export {sanityReplaceReferences};
export default sanityClient({
  projectId: 'kh6phz18', // find this at manage.sanity.io or in your sanity.json
  dataset: "production", // this is from those question during 'sanity init'
  useCdn: true,
  apiVersion: "2021-03-25"
});
