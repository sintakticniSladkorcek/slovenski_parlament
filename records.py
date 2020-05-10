#!/usr/bin/env python

import xml.etree.ElementTree as ET
import glob, os.path
from xml.dom import minidom
import xml.dom
import csv

class GetRecords():
    def __init__(self):
        self.session_files = glob.glob(os.path.join("data", "*.xml"))
        self.session_files.remove("data\\seja.xml")

        self.all_sentences_by_session = []
        i = 1
        # List all sentences for each session
        for session_file in self.session_files:
            print("Finding all sentences in session {} / {}".format(i, len(self.session_files)))
            i += 1
            csv_file_name = session_file[:-4] # remove .xml
            csv_file_name += "_all_sentences.csv"
            csv_file_name = "parsed_" + csv_file_name
            list_of_sentences = []
            dict_of_sentences = {}
            average_length = 0
            session_name = session_file[5:-4]
            with open(csv_file_name, "a", newline="") as csv_all_sentences:
                writer = csv.writer(csv_all_sentences)
                list_of_sentences, dict_of_sentences = self.find_all_sentences(session_file)
                for key in dict_of_sentences:
                    writer.writerow([key, dict_of_sentences[key]])

            self.all_sentences_by_session.append([list_of_sentences, dict_of_sentences, session_name])
             


        self.longest_sentence_of_them_all = ""
        self.longest_sentence_session = ""
        self.longest_sentence_length = ""
        self.second_longest_sentence_of_them_all = ""
        self.second_longest_sentence_session = ""
        self.second_longest_sentence_length = ""
        self.third_longest_sentence_of_them_all = ""
        self.third_longest_sentence_session = ""
        self.third_longest_sentence_length = ""

        # Find the longest sentences for each session
        with open("parsed_data/longest_sentences.csv", "a", newline="") as csv_longest_sentences:

            i = 1
            for session_file in self.session_files:
                print("longest sentence in session {} / {}".format(i, len(self.session_files)))
                max_length = 0
                sentence_length, sentence, session = self.find_longest_sentence_in_session(session_file, self.all_sentences_by_session[i - 1][1])
                writer = csv.writer(csv_longest_sentences)
                # csv_longest_sentences.writelines([[session, sentence_length, sentences]])
                writer.writerow([session, sentence_length, sentence])
                i += 1

                if sentence_length > max_length:
                    max_length = sentence_length
                    
                    self.third_longest_sentence_length = self.second_longest_sentence_length
                    self.third_longest_sentence_of_them_all = self.second_longest_sentence_of_them_all
                    self.third_longest_sentence_session = self.second_longest_sentence_session

                    self.second_longest_sentence_length = self.longest_sentence_length
                    self.second_longest_sentence_of_them_all = self.longest_sentence_of_them_all
                    self.second_longest_sentence_session = self.longest_sentence_session

                    self.longest_sentence_of_them_all = sentence[0]
                    self.longest_sentence_session = session
                    self.longest_sentence_length = sentence_length

        # Top three longest sentences
        with open("parsed_data/longest_sentences_of_them_all.csv", "a", newline="") as csv_longest_sentence_of_them_all:

            writer = csv.writer(csv_longest_sentence_of_them_all)
            writer.writerow([self.longest_sentence_session, self.longest_sentence_length, self.longest_sentence_of_them_all])
            writer.writerow([self.second_longest_sentence_session, self.second_longest_sentence_length, self.second_longest_sentence_of_them_all])
            writer.writerow([self.third_longest_sentence_session, self.third_longest_sentence_length, self.third_longest_sentence_of_them_all])

        # Average sentence per session
        with open("parsed_data/average_sentences.csv", "a", newline="") as csv_average_sentences:

            writer = csv.writer(csv_average_sentences)
            for session in self.all_sentences_by_session:
                list_of_sentences = session[0]
                dict_of_sentences = session[1]
                average_data = self.find_average_sentence_in_session(list_of_sentences, dict_of_sentences)
                session.append(average_data)
                writer.writerow([session[2], average_data[0], average_data[1]])



    def find_average_sentence_in_session(self, list_of_sentences, dict_of_sentences):
        for session in self.all_sentences_by_session:
            
            total_words = 0
            for sentence in list_of_sentences:
                total_words += sentence[0]
            average_length = total_words / len(list_of_sentences)
            rounded_average_length = int(average_length)
            length_up = rounded_average_length
            length_down = rounded_average_length
            found_average_sentence = False
            average_sentence = ""
            while not found_average_sentence:
                if length_down in dict_of_sentences:
                    average_sentence = dict_of_sentences[length_down]
                    found_average_sentence = True
                elif length_up in dict_of_sentences:
                    average_sentence = dict_of_sentences[length_up]
                    found_average_sentence = True
                else:
                    length_down -= 1
                    length_up += 1

        return [average_length, average_sentence]

    def find_longest_sentence_in_session(self, session_file, dict_of_sentences):
        # find the longest sentence
        no_of_sentences = len(dict_of_sentences)
        sorted_dict_of_sentences = sorted(dict_of_sentences)
        last_key = sorted_dict_of_sentences[-1]
        sentence_length = last_key
        sentence = dict_of_sentences[last_key]
        session = session_file[5:-4]
        return sentence_length, sentence, session

    def find_all_sentences(self, session_file):
        root = minidom.parse(session_file)
        all_sentences = root.getElementsByTagName('s')
        list_of_sentences = []
        dict_of_sentences = {}
        for sentence_tag in all_sentences:
            # for each sentence get its length and compose the sentence
            current_sentence = ""
            # sentence_element = sentence_tag.getElementsByTagName()
            sentence_element = sentence_tag.childNodes
            sentence_length = 0
            # a = getText(sentence_element)
            for word in sentence_element:
                if word.nodeType != 1:
                    continue
                if word.nodeName == "w":
                    sentence_length += 1
                current_sentence += word.firstChild.nodeValue
            list_of_sentences.append([sentence_length, current_sentence])
            dict_of_sentences[sentence_length] = current_sentence
        return list_of_sentences, dict_of_sentences

if __name__ == '__main__':
    records = GetRecords()
        