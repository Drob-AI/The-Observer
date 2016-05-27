from sklearn import tree
import requests

X = [[0, 0], [1, 1], [1, 2]]
Y = [0, 1, 1]
clf = tree.DecisionTreeClassifier()
clf = clf.fit(X, Y)
print(clf.predict([2, 2]))

r = requests.get('http://google.com', verify=True)
print(r.status_code)

from pyquery import PyQuery as pq
from lxml import etree
import urllib

d = pq("<html><body>fuaaa</body></html>")
print(d('body').text())
