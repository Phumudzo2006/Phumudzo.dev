// Student Name: [MATSHAYA PHUMUDZO]

#include <iostream>
#include <vector>
#include <string>
#include <queue>
#include <limits>
#include <algorithm>

using namespace std;
const vector<string> cities = {"Johannesburg", "Windhoek", "Gaborone", "Harare", "Maputo"};

// Adjacency list representation of the graph.
// Each element is a vector of pairs, where the pair is {destination_city_index, distance}.
// This is the primary representation for algorithms like Dijkstra's.
vector<vector<pair<int, int>>> adjacencyList =
{
    { {1, 1400}, {2, 350} },
    { {0, 1400}, {2, 900} },
    { {0, 350}, {1, 900}, {3, 950} },
    { {2, 950}, {4, 1100} },
    { {3, 1100} }
};

// --- Function to Display Adjacency Matrix
void displayAdjacencyMatrix(const vector<string>& cityNames, const vector<vector<pair<int, int>>>& adjList) {
    int numCities = cityNames.size();
    vector<vector<int>> matrix(numCities, vector<int>(numCities, 0));
    for (int i = 0; i < numCities; ++i)
        {
            for (const auto& edge : adjList[i])
            {
                matrix[i][edge.first] = edge.second;
            }
        }

    cout << "Adjacency Matrix (Distances in km):" << endl;

    cout << "           ";
    for (const auto& name : cityNames)
        {
            printf("%-15s", name.substr(0, 14).c_str());
        }
    cout << endl;

    for (int i = 0; i < numCities; ++i)
        {
            printf("%-11s", cityNames[i].substr(0, 10).c_str());
            for (int j = 0; j < numCities; ++j)
            {
                printf("%-15d", matrix[i][j]);
            }
            cout << endl;
        }
}


//BFS Traversal

void bfs(int startNode, const vector<string>& cityNames, const vector<vector<pair<int, int>>>& adjList)
{
    cout << "\nBFS Traversal starting from " << cityNames[startNode] << ":" << endl;
    vector<bool> visited(cityNames.size(), false);
    queue<int> q;

    visited[startNode] = true;
    q.push(startNode);

    bool first = true;
    while (!q.empty())
        {
            int u = q.front();
            q.pop();

            if (!first)
                {
                    cout << " -> ";
                }
            cout << cityNames[u];
            first = false;

// Get all adjacent vertices of the dequeued vertex u

            for (const auto& edge : adjList[u])
                {
                    int v = edge.first;
                    if (!visited[v])
                    {
                        visited[v] = true;
                        q.push(v);
                    }
                }
        }
        cout << endl;
}

//Dijkstra's Shortest Path

void dijkstra(int startNode, int endNode, const vector<string>& cityNames, const vector<vector<pair<int, int>>>& adjList)
{
    int numCities = cityNames.size();
    vector<int> dist(numCities, numeric_limits<int>::max());
    vector<int> parent(numCities, -1);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    dist[startNode] = 0;
    pq.push({0, startNode});

    while (!pq.empty())
        {
            int u = pq.top().second;
            pq.pop();
            if (u == endNode) break;
            for (const auto& edge : adjList[u])
            {
                int v = edge.first;
                int weight = edge.second;

                if (dist[v] > dist[u] + weight)
                    {
                        dist[v] = dist[u] + weight;
                        pq.push({dist[v], v});
                        parent[v] = u;
                    }
            }
        }
    cout << "\nDijkstra's Shortest Path from " << cityNames[startNode] << " to " << cityNames[endNode] << ":" << endl;

    if (dist[endNode] == numeric_limits<int>::max())
        {
            cout << "No path found from " << cityNames[startNode] << " to " << cityNames[endNode] << endl;
            return;
        }

    vector<int> path;
    int currentNode = endNode;
    while (currentNode != -1)
        {
            path.push_back(currentNode);
            currentNode = parent[currentNode];
        }
    reverse(path.begin(), path.end());

    cout << "Path: ";
    for (size_t i = 0; i < path.size(); ++i)
        {
            cout << cityNames[path[i]] << (i == path.size() - 1 ? "" : " -> ");
        }
    cout << endl;
    cout << "Total distance: " << dist[endNode] << " km" << endl;
}

int main()
{
    cout << "Transport Connectivity in Southern Africa" << endl;
    cout << "-------------------------------------------------------------" << endl;

    //(Adjacency Matrix)
    displayAdjacencyMatrix(cities, adjacencyList);

    //Perform BFS Traversal Starting from(index 0) which is Johannesburg
    bfs(0, cities, adjacencyList);

    // 3. Finding Dijkstra's Shortest Path From Johannesburg (index 0) to Harare (index 3)
    dijkstra(0, 3, cities, adjacencyList);

    cout << "\n-------------------------------------------------------------" << endl;

    //AI Reflection Section
    //I used AI(chatgpt) to assist me in the following:
    //How to implement Dijkstra's algorithm in C++ using a priority queue
    //Formatted output in C++ using printf

    return 0;
}
