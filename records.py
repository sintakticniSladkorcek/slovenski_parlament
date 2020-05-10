#!/usr/bin/env python

import xml.etree.ElementTree as ET
import glob, os.path
from xml.dom import minidom
import xml.dom
import csv

class GetRecords():
    def __init__(self):
        self.longest_sentence = ""
        self.longest_sentece_per_session = {}  # key = length, value = [session, sentence]
        self.session_files = glob.glob(os.path.join("data", "*.xml"))

        # Open a csv file to write to
        with open("data/longest_sentences.csv", "a") as csv_longest_sentences:

            for session_file in self.session_files:
                sentence_length, sentences, session = self.find_longest_sentence_in_session(session_file)
                writer = csv.writer(csv_longest_sentences)
                # csv_longest_sentences.writelines([[session, sentence_length, sentences]])
                writer.writerow([session, sentence_length, sentences[0]])

        pass

    def find_longest_sentence_in_session(self, session_file):
        # parse xml here
        #root = ET.parse(session_file).getroot()
        root = minidom.parse(session_file)
        # itemlist = root.getElementsByTagName('s')

        # find all sentences
        max_length = 0
        longest_sentence = ""
        longest_sentences = []
        all_sentences = root.getElementsByTagName('s')
        for sentence_tag in all_sentences:
            # for each sentence get its length and compose the sentence
            current_sentence = ""
            # sentence_element = sentence_tag.childNodes
            sentence_element = sentence_tag.getElementsByTagName("w")
            sentence_length = len(sentence_element)
            # a = getText(sentence_element)
            for word in sentence_element:
                current_sentence += word.firstChild.nodeValue
                current_sentence += " "

            if sentence_length > max_length:
                max_length = sentence_length
                longest_sentence = current_sentence
                longest_sentences = [longest_sentence]
            if sentence_length == max_length:
                longest_sentences.append(current_sentence)

        sentence_length = max_length
        sentences = longest_sentences
        session = session_file
        return sentence_length, sentences, session

if __name__ == '__main__':
    records = GetRecords()
        