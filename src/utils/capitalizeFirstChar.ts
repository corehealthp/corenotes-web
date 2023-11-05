export default function CapitalizeFirstChar(sentence:string) {
    if(!sentence) return sentence;
    return sentence.split(" ")[0].substring(0, 1).toUpperCase() + sentence.substring(1, sentence.length);
} 