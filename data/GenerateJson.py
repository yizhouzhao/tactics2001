#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd


# In[2]:


data = pd.read_csv("book.csv")


# In[3]:


data.head()


# In[4]:


print(data.to_dict('records')[0])


# In[5]:


data_dict =  data.to_dict('records')


# In[6]:


for item in data_dict:
    item['description'] = "{} {} {} {} {} {} {} {} {}".format(item['no'],item['player1'],item['player2'],item['place'],
                                                          item['year'],item['class'],item['strategy'],item['move'],
                                                          "+-" if item['result'] == "1-0" else "-+"
                                                         )
    item['solution'] = item["PGN"].split("\n\n")[-1]
    item['solution'] = item['solution'].replace("\n"," ")


# In[7]:


#item


# In[8]:


import json


# In[9]:


with open('book.js', 'w') as fp:
    json.dump(data_dict, fp)


# In[10]:


def line_prepender(filename, line):
    with open(filename, 'r+') as f:
        content = f.read()
        f.seek(0, 0)
        f.write(line.rstrip('\r\n') + '\n' + content)


# In[11]:


line_prepender("book.js","var book =")


# In[ ]:




