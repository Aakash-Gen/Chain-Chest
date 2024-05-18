import { getAddressForIndexAndAddress } from '@/contracts/Web3';

export const combinePairsForSharedFiles = async (input, address) =>  {
    const output = [];

    for (let i = 0; i < input.length; i += 5) {
        const sublist = input.slice(i, i + 5);
        const combinedElement = sublist[1] + sublist[2];
        
        // console.log('sublist:', sublist);
        const addressOutput = await getAddressForIndexAndAddress(address, sublist[0]);

        const newSublist = [addressOutput, combinedElement, sublist[3], sublist[4]];
        output.push(newSublist);
    }

    return output;
}