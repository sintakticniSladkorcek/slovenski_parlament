#!/usr/bin/env python

import glob, os.path
from xml.dom import minidom
import xml.dom
import csv
from collections import Counter, defaultdict

class GetRecords():
    def __init__(self):
        self.session_files = glob.glob(os.path.join("data", "*.xml"))
        self.session_files.remove("data\\seja.xml")


        # SENTENCES
        # self.all_sentences_by_session = []
        # i = 1
        # # List all sentences for each session
        # for session_file in self.session_files:
        #     print("Finding all sentences in session {} / {}".format(i, len(self.session_files)))
        #     i += 1
        #     csv_file_name = session_file[5:-4] # remove .xml
        #     csv_file_name += "_all_sentences.csv"
        #     csv_file_name = "parsed_data\\sentences\\" + csv_file_name
        #     list_of_sentences = []
        #     dict_of_sentences = {}
        #     average_length = 0
        #     session_name = session_file[5:-4]
        #     with open(csv_file_name, "a", newline="", encoding="utf-8") as csv_all_sentences:
        #         writer = csv.writer(csv_all_sentences)
        #         list_of_sentences, dict_of_sentences = self.find_all_sentences(session_file)
        # #         for key in dict_of_sentences:
        # #             writer.writerow([key, dict_of_sentences[key]])
        #         for index in range(0, len(list_of_sentences)):
        #             my_tuple = list_of_sentences[index]
        #             writer.writerow([my_tuple[0], my_tuple[1]])

        #     self.all_sentences_by_session.append([list_of_sentences, dict_of_sentences, session_name])
             


        # self.longest_sentence_of_them_all = ""
        # self.longest_sentence_session = ""
        # self.longest_sentence_length = ""
        # self.second_longest_sentence_of_them_all = ""
        # self.second_longest_sentence_session = ""
        # self.second_longest_sentence_length = ""
        # self.third_longest_sentence_of_them_all = ""
        # self.third_longest_sentence_session = ""
        # self.third_longest_sentence_length = ""

        # # Find the longest sentences for each session
        # with open("parsed_data/sentences/longest_sentences.csv", "a", newline="", encoding="utf-8") as csv_longest_sentences:

        #     i = 1
        #     for session_file in self.session_files:
        #         print("longest sentence in session {} / {}".format(i, len(self.session_files)))
        #         max_length = 0
        #         sentence_length, sentence, session = self.find_longest_sentence_in_session(session_file, self.all_sentences_by_session[i - 1][1])
        #         writer = csv.writer(csv_longest_sentences)
        #         # csv_longest_sentences.writelines([[session, sentence_length, sentences]])
        #         writer.writerow([session, sentence_length, sentence])
        #         i += 1

        #         if sentence_length > max_length:
        #             max_length = sentence_length
                    
        #             self.third_longest_sentence_length = self.second_longest_sentence_length
        #             self.third_longest_sentence_of_them_all = self.second_longest_sentence_of_them_all
        #             self.third_longest_sentence_session = self.second_longest_sentence_session

        #             self.second_longest_sentence_length = self.longest_sentence_length
        #             self.second_longest_sentence_of_them_all = self.longest_sentence_of_them_all
        #             self.second_longest_sentence_session = self.longest_sentence_session

        #             self.longest_sentence_of_them_all = sentence
        #             self.longest_sentence_session = session
        #             self.longest_sentence_length = sentence_length

        # # Top three longest sentences
        # with open("parsed_data/sentences/longest_sentences_of_them_all.csv", "a", newline="", encoding="utf-8") as csv_longest_sentence_of_them_all:

        #     writer = csv.writer(csv_longest_sentence_of_them_all)
        #     writer.writerow([self.longest_sentence_session, self.longest_sentence_length, self.longest_sentence_of_them_all])
        #     writer.writerow([self.second_longest_sentence_session, self.second_longest_sentence_length, self.second_longest_sentence_of_them_all])
        #     writer.writerow([self.third_longest_sentence_session, self.third_longest_sentence_length, self.third_longest_sentence_of_them_all])

        # # Average sentence per session
        # with open("parsed_data/sentences/average_sentences.csv", "a", newline="", encoding="utf-8") as csv_average_sentences:

        #     writer = csv.writer(csv_average_sentences)
        #     for session in self.all_sentences_by_session:
        #         list_of_sentences = session[0]
        #         dict_of_sentences = session[1]
        #         average_data = self.find_average_sentence_in_session(list_of_sentences, dict_of_sentences)
        #         session.append(average_data)
        #         writer.writerow([session[2], average_data[0], average_data[1]])



        # WORDS
        # Most used word in each session / and throughout the session

        # for each session
        # for each new word
        # add word to dictionary and increase the counter
        # also add word to global dictionary for all sessions together
        # keep the list of top 20 words at each moment
        # write current scores to file for this session 
        # (produce wordcloud for that list and save image to folder)
        # write final results (counters) to a specific file for all sessions together
        # with open('stopwords-sl.txt', mode='r', encoding='utf-8') as f:
        #     stopwords = set(f.read().splitlines())

        #     with open("parsed_data/word_frequencies/word_frequencies_by_session.csv", "a", newline="", encoding="utf-8") as session_total_csv:
        #         writer_session_total = csv.writer(session_total_csv)
        #         with open("parsed_data/word_frequencies/word_frequencies_altogether.csv", "a", newline="", encoding="utf-8") as global_frequencies_csv:
        #             writer_global = csv.writer(global_frequencies_csv)
        #             global_list = []
        #             i = 1

        #             global_dict_of_words = {}
        #             for session_file in self.session_files:
        #                 print("Finding word frequencies in session {} / {}".format(i, len(self.session_files)))
        #                 i += 1
        #                 session_name = session_file[5:-4]
        #                 csv_file_name = "parsed_data\word_frequencies\\" + session_name + "_word_frequencies_timeline.csv"
                        
        #                 global_list_of_frequencies = []
        #                 list_of_frequencies = []
        #                 dict_of_words = {}
                        
        #                 with open(csv_file_name, "a", newline="", encoding="utf-8") as session_timeline_csv:
        #                     wirter_timeline = csv.writer(session_timeline_csv)

        #                     root = minidom.parse(session_file)
        #                     all_speeches = root.getElementsByTagName('div')

        #                     for speech in all_speeches:
        #                         if speech.getAttribute("type") != "sp":
        #                             all_speeches.remove(speech)

        #                     for speech in all_speeches:
        #                         children = speech.childNodes
        #                         if len(children) < 1:
        #                             continue
        #                         # speaker, u
        #                         for child in children:
        #                             if child.nodeName == "note":
        #                                 continue

        #                             all_sentences = child.childNodes
        #                             for sentence in all_sentences:
        #                                 all_words = sentence.childNodes

        #                                 for word in all_words:
        #                                     if word.nodeType != 1:
        #                                         continue
        #                                     if word.nodeName != "w":
        #                                         continue

        #                                     actual_word = word.getAttribute("lemma")

        #                                     # check if important
        #                                     if actual_word in stopwords:
        #                                         continue

        #                                     if self.hasNumbers(actual_word):
        #                                         continue

        #                                     if len(actual_word) < 2:
        #                                         continue

        #                                     if actual_word not in dict_of_words:
        #                                         dict_of_words[actual_word] = 1
        #                                     else:
        #                                         dict_of_words[actual_word] += 1

        #                                     if actual_word not in global_dict_of_words:
        #                                         global_dict_of_words[actual_word] = 1
        #                                     else:
        #                                         global_dict_of_words[actual_word] += 1
                                            
        #                         # write current stats to session_timeline_csv and to global_timeline_csv
        #                         list_of_words = [(k, v) for k, v in dict_of_words.items()] 
        #                         list_of_frequencies = sorted(list_of_words, key=lambda tup: tup[1], reverse=True)
        #                         if len(list_of_frequencies) > 0:
        #                             wirter_timeline.writerow([list_of_frequencies])
                            
        #                 writer_session_total.writerow([session_name, list_of_frequencies])
        #                 if i > 607:
        #                     print("Global words")
        #                     global_list_of_words = [(k, v) for k, v in global_dict_of_words.items()] 
        #                     global_list_of_frequencies = sorted(global_list_of_words, key=lambda tup: tup[1], reverse=True)
        #                     global_list = global_list_of_frequencies                    
        #             for tuple in global_list:
        #                 writer_global.writerow([tuple[1], tuple[0]])

        #     print("Done.")


        # INCIDENTS
        # LIST OF ALL DIFFERENT INCIDENTS
        with open("parsed_data/events/list_of_all_different_events.csv", "a", newline="", encoding="utf-8") as event_list_csv:
            writer = csv.writer(event_list_csv)
            i = 1
            dict_all_events = {}
            for session_file in self.session_files:
                # if session_file != "data\\seja.xml":
                #     continue
                print("Finding incidents in session {} / {}".format(i, len(self.session_files)))
                i += 1
                root = minidom.parse(session_file)
                all_events = root.getElementsByTagName('incident')
                for event in all_events:
                    contents = event.childNodes
                    for content in contents:
                        if content.nodeName != "desc":
                            continue
                        actual_event = content.firstChild.nodeValue
                        if actual_event not in dict_all_events:
                            dict_all_events[actual_event] = 1
                        else:
                            dict_all_events[actual_event] += 1
            
            sorted_events = sorted(dict_all_events)
            for key in sorted_events:
                writer.writerow([key, dict_all_events[key]])






        # Speakers

        # Total number of speeches + their length + session name + predsedujoči/ne
        # Total number of words
        # Total number of people in session


    def hasNumbers(self, inputString):
        return any(char.isdigit() for char in inputString)

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
        