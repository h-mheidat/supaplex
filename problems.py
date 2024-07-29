nums = [3, 5, 4, 4, 3, 1, 3, 2]

maxnum = nums[-1]
out = []

out.append(maxnum)

for i in range(len(nums)-1, 0, -1):
    if nums[i] > maxnum:
        out.append(nums[i])
        maxnum = nums[i]

out.reverse()
print(out)
