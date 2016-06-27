import random
import numpy as np
from sklearn import tree
from sklearn.metrics import accuracy_score

def split_sets(dataset, test_set_len):
    test_set = []
    original_dataset_len = len(dataset)
    dataset = list(dataset)
    while(len(test_set) < original_dataset_len * test_set_len):
        index = random.randint(0, len(dataset) - 1)
        test_set.append(dataset[index])
        del dataset[index]

    return ( test_set, dataset)

def split_train_result_set(set, feature_index):
    transponed = np.array(set).T
    results_set = transponed[feature_index]

    transponed = list(transponed)
    del transponed[feature_index]

    x_set = np.array(transponed).T
    results_set = results_set.T
    return(x_set, results_set)


def train_classifier_tree(dataset, feature_index):
    # print(dataset, feature_index)
    test_set, train_set = split_sets(dataset, 0.1)
    x_train, y_train = split_train_result_set(train_set, feature_index)
    x_train_test, y_train_test = split_train_result_set(test_set, feature_index)

    clf = tree.DecisionTreeClassifier()
    clf = clf.fit(x_train, y_train)
    print(accuracy_score(clf.predict(x_train_test), y_train_test))


    print(len(test_set), len(train_set))